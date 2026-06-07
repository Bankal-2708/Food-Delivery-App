import { useState, useEffect, useCallback, useMemo } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CATEGORIES = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];
const initialForm = { name: "", description: "", price: "", category: CATEGORIES[0], image: "" };

export default function AdminPanel() {
  const [tab, setTab] = useState("dishes");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token") || "";

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const headers = useMemo(() => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,    
}), [token]);

   const fetchFoods = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/food`);
      const data = await res.json();
      if (data.success) setFoods(data.data);
      else setFoods([]);
    } catch {
      showToast("Failed to load dishes", "error");
    }
  }, [showToast]);

   const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/all`, { headers });
      const data = await res.json();
      if (data.success) setOrders(data.data);
      else setOrders([]);
    } catch {
      showToast("Failed to load orders", "error");
    }
  }, [headers, showToast]);

   useEffect(() => {
    (async () => { await fetchFoods(); })();
  }, [fetchFoods]);

   useEffect(() => {
    if (tab !== "orders") return;
    (async () => { await fetchOrders(); })();
  }, [tab, fetchOrders]);

  const handleSubmit = async () => {
    if (!form.name || !form.price) return showToast("Name and price are required", "error");
    setLoading(true);
    try {
      const url = editId ? `${API_BASE}/food/update/${editId}` : `${API_BASE}/food/add`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editId ? "Dish updated!" : "Dish added!");
        setForm(initialForm);
        setEditId(null);
        fetchFoods();
      } else showToast(data.message || "Error", "error");
    } catch {
      showToast("Request failed", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this dish?")) return;
    try {
      const res = await fetch(`${API_BASE}/food/remove/${id}`, { method: "DELETE", headers });
      const data = await res.json();
      if (data.success) { showToast("Dish removed"); fetchFoods(); }
      else showToast(data.message || "Error", "error");
    } catch { showToast("Request failed", "error"); }
  };

  const handleEdit = (food) => {
    setEditId(food._id);
    setForm({ name: food.name, description: food.description || "", price: food.price, category: food.category, image: food.image || "" });
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderAction = async (id, action) => {
    const methods = { confirm: "PUT", deliver: "PUT", cancel: "DELETE" };
    try {
      const res = await fetch(`${API_BASE}/orders/${action}/${id}`, { method: methods[action], headers });
      const data = await res.json();
      if (data.success) { showToast(`Order ${action}ed!`); fetchOrders(); }
      else showToast(data.message || "Error", "error");
    } catch { showToast("Request failed", "error"); }
  };

  const statusColor = { pending: "#f59e0b", confirmed: "#10b981", delivered: "#6366f1", cancelled: "#ef4444" };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#e5e5e5", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
       <div style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#ff6b35,#f7c59f)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🍔</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Food Admin</div>
            <div style={{ fontSize: 11, color: "#666" }}>Management Panel</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["dishes", "add", "orders"].map((t) => (
            <button key={t}
              onClick={() => { setTab(t); if (t !== "add") { setEditId(null); setForm(initialForm); } }}
              style={{ padding: "7px 18px", borderRadius: 8, border: "1px solid", fontFamily: "inherit", fontSize: 13, cursor: "pointer",
                fontWeight: tab === t ? 600 : 400, background: tab === t ? "#ff6b35" : "transparent",
                borderColor: tab === t ? "#ff6b35" : "#333", color: tab === t ? "#fff" : "#aaa", transition: "all 0.2s" }}>
              {t === "dishes" ? "🍽 Dishes" : t === "add" ? (editId ? "✏️ Edit" : "➕ Add") : "📦 Orders"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {toast && (
          <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999, padding: "12px 20px", borderRadius: 10,
            background: toast.type === "error" ? "#ef4444" : "#10b981", color: "#fff", fontWeight: 600, fontSize: 14,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
            {toast.msg}
          </div>
        )}

         {tab === "dishes" && (
          <div>
            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
                All Dishes <span style={{ color: "#666", fontWeight: 400, fontSize: 15 }}>({foods.length})</span>
              </h2>
              <button onClick={() => setTab("add")}
                style={{ background: "#ff6b35", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                + Add New Dish
              </button>
            </div>
            {foods.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>No dishes yet. Add your first one!</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {foods.map((food) => (
                  <div key={food._id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: "#252525", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                      {food.image
                        ? <img src={food.image} alt={food.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                        : "🍽"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{food.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{food.category}</div>
                      {food.description && (
                        <div style={{ fontSize: 12, color: "#555", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {food.description}
                        </div>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "#ff6b35", flexShrink: 0 }}>₹{food.price}</div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button onClick={() => handleEdit(food)}
                        style={{ padding: "6px 14px", background: "#252525", border: "1px solid #333", color: "#ccc", borderRadius: 7, cursor: "pointer", fontSize: 12 }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(food._id)}
                        style={{ padding: "6px 14px", background: "transparent", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 7, cursor: "pointer", fontSize: 12 }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

         {tab === "add" && (
          <div>
            <h2 style={{ margin: "0 0 1.5rem", fontSize: 22, fontWeight: 700 }}>{editId ? "Edit Dish" : "Add New Dish"}</h2>
            <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 14, padding: "1.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { key: "name", label: "Dish Name *", placeholder: "e.g. Margherita Pizza" },
                  { key: "price", label: "Price (₹) *", placeholder: "e.g. 299", type: "number" }
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, color: "#888", marginBottom: 6, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                    <input type={type || "text"} value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                      style={{ width: "100%", padding: "10px 14px", background: "#252525", border: "1px solid #333", borderRadius: 8, color: "#e5e5e5", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "#888", marginBottom: 6, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", background: "#252525", border: "1px solid #333", borderRadius: 8, color: "#e5e5e5", fontSize: 14, outline: "none" }}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "#888", marginBottom: 6, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} placeholder="Describe the dish..."
                  style={{ width: "100%", padding: "10px 14px", background: "#252525", border: "1px solid #333", borderRadius: 8, color: "#e5e5e5", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, color: "#888", marginBottom: 6, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://... or leave blank for default"
                  style={{ width: "100%", padding: "10px 14px", background: "#252525", border: "1px solid #333", borderRadius: 8, color: "#e5e5e5", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex: 1, padding: "12px", background: loading ? "#555" : "#ff6b35", border: "none", borderRadius: 9, color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "default" : "pointer" }}>
                  {loading ? "Saving..." : editId ? "Update Dish" : "Add Dish"}
                </button>
                {editId && (
                  <button onClick={() => { setEditId(null); setForm(initialForm); setTab("dishes"); }}
                    style={{ padding: "12px 22px", background: "#252525", border: "1px solid #333", borderRadius: 9, color: "#aaa", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

         {tab === "orders" && (
          <div>
            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
                Orders <span style={{ color: "#666", fontWeight: 400, fontSize: 15 }}>({orders.length})</span>
              </h2>
              <button onClick={fetchOrders}
                style={{ background: "transparent", border: "1px solid #333", color: "#aaa", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
                ↻ Refresh
              </button>
            </div>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>No orders yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {orders.map((order) => (
                  <div key={order._id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{order.customerName}</div>
                        <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{order.address}</div>
                        <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{new Date(order.placedAt).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, fontSize: 17, color: "#ff6b35" }}>₹{order.totalAmount}</div>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                          background: statusColor[order.status] + "22", color: statusColor[order.status],
                          marginTop: 6, display: "inline-block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div style={{ background: "#151515", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#888" }}>
                      {(order.items || []).map((item, i) => (
                        <span key={i}>{item.name} ×{item.quantity}{i < order.items.length - 1 ? ", " : ""}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {order.status === "pending" && (
                        <button onClick={() => handleOrderAction(order._id, "confirm")}
                          style={{ padding: "7px 16px", background: "#10b981", border: "none", color: "#fff", borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
                          ✓ Confirm
                        </button>
                      )}
                      {order.status === "confirmed" && (
                        <button onClick={() => handleOrderAction(order._id, "deliver")}
                          style={{ padding: "7px 16px", background: "#6366f1", border: "none", color: "#fff", borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
                          🚚 Mark Delivered
                        </button>
                      )}
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button onClick={() => handleOrderAction(order._id, "cancel")}
                          style={{ padding: "7px 16px", background: "transparent", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 7, cursor: "pointer", fontSize: 12 }}>
                          ✕ Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}