import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import api, { getErrorMessage } from "../api";
import { ErrorBanner, Spinner, EmptyState } from "../components/Feedback";
import AuditNote from "../components/AuditNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const EMPTY_FORM = { question: "", answer: "", order: 0 };

function FaqFormDialog({ open, onOpenChange, initial, nextOrder, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? { question: initial.question || "", answer: initial.answer || "", order: initial.order ?? 0 }
          : { ...EMPTY_FORM, order: nextOrder }
      );
      setErr("");
    }
  }, [open, initial, nextOrder]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setErr("Question and Answer are required.");
      return;
    }
    setErr("");
    setSaving(true);
    const payload = { question: form.question, answer: form.answer, order: Number(form.order) || 0 };
    try {
      if (initial) {
        await api.put(`/faq/${initial.id}`, payload);
      } else {
        await api.post("/faq", payload);
      }
      onSaved();
      onOpenChange(false);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't save this FAQ. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-ink">Question</Label>
            <Input
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">Answer</Label>
            <Textarea
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              className="mt-1.5"
              rows={4}
              required
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">Order</Label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
              className="mt-1.5 max-w-[140px]"
            />
            <p className="mt-1 text-xs text-slate-400">Lower numbers show first on the public Pricing page.</p>
          </div>

          {err && <ErrorBanner message={err} />}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-forest hover:bg-forest-dark text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Save changes" : "Add FAQ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Faq() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await api.get("/faq");
      setItems(res.data || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load the FAQ. Please refresh to try again."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const sorted = useMemo(() => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)), [items]);
  const nextOrder = useMemo(
    () => (sorted.length ? Math.max(...sorted.map((i) => i.order ?? 0)) + 1 : 0),
    [sorted]
  );

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    setFormOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this FAQ entry? This can't be undone.`)) return;
    setError("");
    setDeletingId(item.id);
    try {
      await api.delete(`/faq/${item.id}`);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete this FAQ entry. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Pricing FAQ</h1>
          <p className="mt-1 text-sm text-body">Shown on the public Pricing page, in order below.</p>
        </div>
        <Button onClick={openAdd} className="bg-forest hover:bg-forest-dark text-white">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {error && <ErrorBanner message={error} className="mt-4" />}

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Spinner />
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState>No FAQ entries yet. Add your first one above.</EmptyState>
        ) : (
          sorted.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest bg-forest-light px-2 py-0.5 rounded-full">
                      #{item.order ?? 0}
                    </span>
                    <h3 className="font-semibold text-ink">{item.question}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-body">{item.answer}</p>
                  <AuditNote item={item} className="mt-2" />
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <FaqFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} nextOrder={nextOrder} onSaved={load} />
    </div>
  );
}
