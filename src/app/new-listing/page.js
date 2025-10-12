"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import styles from "./NewListing.module.css";

// Read env once; staging can submit, prod is disabled
const ENV =
  process.env.NEXT_PUBLIC_ENVIRONMENT ||
  process.env.NEXT_PUBLIC_SITE_ENV ||
  process.env.NEXT_PUBLIC_SITE_ENVIRONMENT ||
  "production";
const IS_PROD = ENV.toLowerCase() === "production";

export default function NewListingPage() {
  const router = useRouter();

  // --- form fields ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://source.unsplash.com/random");
  const [loopSlug, setLoopSlug] = useState("");
  const [type, setType] = useState("offer"); // keep if you show it; only insert if your table has this column
  const [subcategoryIds, setSubcategoryIds] = useState([]); // strings from <select multiple>

  // --- reference data ---
  const [loops, setLoops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // --- ui state ---
  const [submitting, setSubmitting] = useState(false);

  // fetch loops + categories + subcategories
  useEffect(() => {
    (async () => {
      const [{ data: loopsData }, { data: cats }, { data: subs }] = await Promise.all([
        supabase.from("loops").select("slug, name").order("name"),
        supabase.from("categories").select("id, name").order("name"),
        supabase.from("subcategories").select("id, name, category_id").order("name"),
      ]);
      if (loopsData) setLoops(loopsData);
      if (cats) setCategories(cats);
      if (subs) setSubcategories(subs);
    })();
  }, []);

  // group subcategories under their category
  const subcatsByCategory = useMemo(() => {
    const map = new Map();
    for (const c of categories) map.set(c.id, []);
    for (const s of subcategories) {
      if (!map.has(s.category_id)) map.set(s.category_id, []);
      map.get(s.category_id).push(s);
    }
    return map;
  }, [categories, subcategories]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (IS_PROD) return; // double guard; button is disabled anyway

    setSubmitting(true);
    try {
      // ✔️ you must be authenticated for your RLS policy
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      const user = userRes?.user;
      if (!user) {
        setSubmitting(false);
        alert("You must sign in to post a listing (RLS requires created_by = auth.uid()).");
        return;
      }

      // build payload to match your current schema
      const payload = {
        title: title?.trim(),
        description: description?.trim(),
        loop_slug: loopSlug || null,
        images: imageUrl ? [String(imageUrl)] : [],             // text[] column
        status: "open",
        created_by: user.id,                                     // ✔️ satisfy with_check (created_by = auth.uid())
        subcategory_ids: (subcategoryIds || []).map((v) => Number(v)), // int8[]
        // type, // uncomment only if your listings table has a 'type' column
      };

      // clean up undefined fields
      Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined) delete payload[k];
      });

      const { error } = await supabase.from("listings").insert(payload);
      setSubmitting(false);

      if (error) {
        alert(`Submission failed: ${error.message}`);
        return;
      }

      alert("Listing submitted!");
      router.push("/listings");
    } catch (err) {
      setSubmitting(false);
      alert(`Submission failed: ${err?.message || String(err)}`);
    }
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Post a New Listing</h1>

      {IS_PROD && (
        <p className={styles.envNote}>
          Listing creation is disabled in this environment.
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title *
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={IS_PROD || submitting}
            required
          />
        </label>

        <label className={styles.label}>
          Description
          <textarea
            className={styles.textarea}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={IS_PROD || submitting}
          />
        </label>

        <label className={styles.label}>
          Image URL (https)
          <input
            className={styles.input}
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://source.unsplash.com/random"
            disabled={IS_PROD || submitting}
          />
        </label>

        <label className={styles.label}>
          Loop
          <select
            className={styles.select}
            value={loopSlug}
            onChange={(e) => setLoopSlug(e.target.value)}
            disabled={IS_PROD || submitting}
          >
            <option value="">— Select loop —</option>
            {loops.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Type
          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={IS_PROD || submitting}
          >
            <option value="offer">Offer</option>
            <option value="request">Request</option>
          </select>
        </label>

        {/* Grouped multi-select: categories as bold labels, subcategories beneath */}
        <label className={styles.label}>
          Subcategories
          <select
            className={styles.select}
            multiple
            size={8}
            value={subcategoryIds}
            onChange={(e) =>
              setSubcategoryIds(Array.from(e.target.selectedOptions, (o) => o.value))
            }
            disabled={IS_PROD || submitting}
          >
            {categories.map((cat) => {
              const children = subcatsByCategory.get(cat.id) || [];
              if (!children.length) return null;
              return (
                <optgroup key={cat.id} label={cat.name}>
                  {children.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <span className={styles.help}>Hold Cmd/Ctrl to select multiple.</span>
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submit}
            disabled={IS_PROD || submitting}
            aria-disabled={IS_PROD || submitting}
            title={IS_PROD ? "Creation disabled in production" : "Submit listing"}
          >
            {IS_PROD ? "Creation disabled" : submitting ? "Submitting…" : "Submit Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
