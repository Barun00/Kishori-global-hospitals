/* KGH ADMIN — Supabase Auth + appointment/enquiry management */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const db = window.kghSupabase;

  const loginSection = document.getElementById("loginSection");
  const dashboard = document.getElementById("dashboard");
  const loginForm = document.getElementById("adminLoginForm");
  const loginStatus = document.getElementById("loginStatus");
  const dashboardStatus = document.getElementById("dashboardStatus");

  let adminUser = null;
  let activeTab = "appointments";

  const appointmentStates = [
    "pending", "confirmed", "rescheduled", "completed", "cancelled"
  ];

  const messageStates = [
    "new", "in_progress", "resolved", "archived"
  ];

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }

  function message(element, text, type = "") {
    if (!element) return;
    element.textContent = text;
    element.classList.remove("kadmin-error", "kadmin-success");

    if (type === "error") element.classList.add("kadmin-error");
    if (type === "success") element.classList.add("kadmin-success");
  }

  function dateText(value) {
    if (!value) return "—";
    const d = new Date(value + (String(value).length === 10 ? "T00:00:00" : ""));
    return Number.isNaN(d.getTime())
      ? String(value)
      : d.toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric"
        });
  }

  function dateTimeText(value) {
    if (!value) return "—";
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? "—"
      : d.toLocaleString("en-IN", {
          day: "2-digit", month: "short", year: "numeric",
          hour: "2-digit", minute: "2-digit"
        });
  }

  function stateOptions(current, values) {
    return values.map((value) => `
      <option value="${value}" ${value === current ? "selected" : ""}>
        ${esc(value.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()))}
      </option>
    `).join("");
  }

  function showLogin() {
    loginSection.hidden = false;
    dashboard.hidden = true;
  }

  function showDashboard(user) {
    adminUser = user;
    loginSection.hidden = true;
    dashboard.hidden = false;
    document.getElementById("signedInEmail").textContent =
      user.email || "Authorised administrator";
  }

  async function verifyAdmin(user) {
    const { data, error } = await db
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      await db.auth.signOut();
      adminUser = null;
      showLogin();

      message(
        loginStatus,
        "This account is not authorised for hospital administration. Ask the system administrator to grant access.",
        "error"
      );

      return false;
    }

    showDashboard(user);
    await refreshAll();
    return true;
  }


  // ---------- LOGIN ----------

  if (!db) {
    message(
      loginStatus,
      "Backend is not configured. Check supabase-config.js and the Supabase SDK script.",
      "error"
    );
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    message(loginStatus, "");

    if (!db) {
      message(loginStatus, "Supabase is not configured.", "error");
      return;
    }

    const button = document.getElementById("loginButton");
    button.disabled = true;
    button.textContent = "Signing in...";

    try {
      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value;

      const { data, error } = await db.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        message(
          loginStatus,
          "Sign-in failed. Check your email, password and Supabase Auth settings.",
          "error"
        );
        return;
      }

      await verifyAdmin(data.user);
    } catch (error) {
      message(loginStatus, "Authentication service is unavailable.", "error");
    } finally {
      button.disabled = false;
      button.innerHTML = '<i class="fa-solid fa-lock"></i> Sign In';
    }
  });


  // ---------- DASHBOARD COUNTS ----------

  async function count(table, column, value) {
    let query = db.from(table).select("id", {
      count: "exact", head: true
    });

    if (column) query = query.eq(column, value);

    const { count: total, error } = await query;
    return error ? null : (total ?? 0);
  }

  async function loadStats() {
    const [total, pending, newEnquiries] = await Promise.all([
      count("appointments"),
      count("appointments", "status", "pending"),
      count("contact_messages", "status", "new")
    ]);

    document.getElementById("totalAppointments").textContent =
      total ?? "—";
    document.getElementById("pendingAppointments").textContent =
      pending ?? "—";
    document.getElementById("newMessages").textContent =
      newEnquiries ?? "—";
  }


  // ---------- APPOINTMENTS ----------

  async function loadAppointments() {
    const tbody = document.getElementById("appointmentsTable");

    tbody.innerHTML = `
      <tr><td colspan="7">Loading appointment requests...</td></tr>
    `;

    const { data, error } = await db
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      tbody.innerHTML = `
        <tr><td colspan="7">Could not load appointments. Check the schema and RLS policies.</td></tr>
      `;
      return false;
    }

    if (!data?.length) {
      tbody.innerHTML = `
        <tr><td colspan="7">No appointment requests received yet.</td></tr>
      `;
      return true;
    }

    tbody.innerHTML = data.map((r) => `
      <tr data-id="${esc(r.id)}">
        <td>
          <strong>${esc(r.patient_name)}</strong><br>
          <span class="kadmin-muted">${esc(dateTimeText(r.created_at))}</span>
          ${r.visit_reason
            ? `<br><span class="kadmin-muted">Reason: ${esc(r.visit_reason)}</span>`
            : ""}
        </td>

        <td>
          <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>
        </td>

        <td>
          ${esc(r.department)}
          ${r.preferred_doctor
            ? `<br><span class="kadmin-muted">${esc(r.preferred_doctor)}</span>`
            : ""}
        </td>

        <td>
          ${esc(dateText(r.preferred_date))}
          <br><span class="kadmin-muted">${esc(r.preferred_time || "Flexible")}</span>
        </td>

        <td>
          <select class="record-status" aria-label="Appointment status">
            ${stateOptions(r.status, appointmentStates)}
          </select>
        </td>

        <td>
          <textarea class="record-notes" maxlength="2000"
            aria-label="Internal notes">${esc(r.admin_notes)}</textarea>
        </td>

        <td>
          <button type="button" class="kadmin-button save-appointment"
            data-id="${esc(r.id)}">Save</button>
        </td>
      </tr>
    `).join("");

    return true;
  }

  async function saveAppointment(button) {
    const row = button.closest("tr");
    const id = button.dataset.id;
    const status = row.querySelector(".record-status").value;
    const notes = row.querySelector(".record-notes").value.trim();

    if (!appointmentStates.includes(status)) {
      message(dashboardStatus, "Invalid appointment status.", "error");
      return;
    }

    button.disabled = true;
    button.textContent = "Saving...";

    try {
      const { error } = await db
        .from("appointments")
        .update({ status, admin_notes: notes })
        .eq("id", id);

      if (error) {
        message(
          dashboardStatus,
          "Appointment update failed. Check administrator permissions.",
          "error"
        );
        return;
      }

      message(dashboardStatus, "Appointment updated.", "success");
      await loadStats();
    } finally {
      button.disabled = false;
      button.textContent = "Save";
    }
  }

  document.getElementById("appointmentsTable")
    .addEventListener("click", (event) => {
      const button = event.target.closest(".save-appointment");
      if (button) saveAppointment(button);
    });


  // ---------- CONTACT ENQUIRIES ----------

  async function loadMessages() {
    const tbody = document.getElementById("messagesTable");

    tbody.innerHTML = `
      <tr><td colspan="7">Loading enquiries...</td></tr>
    `;

    const { data, error } = await db
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      tbody.innerHTML = `
        <tr><td colspan="7">Could not load enquiries. Check the schema and permissions.</td></tr>
      `;
      return false;
    }

    if (!data?.length) {
      tbody.innerHTML = `
        <tr><td colspan="7">No contact enquiries received yet.</td></tr>
      `;
      return true;
    }

    tbody.innerHTML = data.map((r) => `
      <tr data-id="${esc(r.id)}">
        <td>
          <strong>${esc(r.name)}</strong><br>
          <span class="kadmin-muted">${esc(dateTimeText(r.created_at))}</span>
        </td>

        <td>
          <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>
          ${r.email ? `<br>${esc(r.email)}` : ""}
        </td>

        <td>${esc(r.category)}</td>
        <td>${esc(r.message)}</td>

        <td>
          <select class="record-status" aria-label="Enquiry status">
            ${stateOptions(r.status, messageStates)}
          </select>
        </td>

        <td>
          <textarea class="record-notes" maxlength="2000"
            aria-label="Internal notes">${esc(r.admin_notes)}</textarea>
        </td>

        <td>
          <button type="button" class="kadmin-button save-message"
            data-id="${esc(r.id)}">Save</button>
        </td>
      </tr>
    `).join("");

    return true;
  }

  async function saveMessage(button) {
    const row = button.closest("tr");
    const status = row.querySelector(".record-status").value;
    const notes = row.querySelector(".record-notes").value.trim();

    if (!messageStates.includes(status)) {
      message(dashboardStatus, "Invalid enquiry status.", "error");
      return;
    }

    button.disabled = true;
    button.textContent = "Saving...";

    try {
      const { error } = await db
        .from("contact_messages")
        .update({
          status,
          admin_notes: notes
        })
        .eq("id", button.dataset.id);

      if (error) {
        message(
          dashboardStatus,
          "Enquiry update failed. Check administrator permissions.",
          "error"
        );
        return;
      }

      message(dashboardStatus, "Enquiry updated.", "success");
      await loadStats();
    } finally {
      button.disabled = false;
      button.textContent = "Save";
    }
  }

  document.getElementById("messagesTable")
    .addEventListener("click", (event) => {
      const button = event.target.closest(".save-message");
      if (button) saveMessage(button);
    });


  // ---------- TABS + REFRESH ----------

  async function refreshAll() {
    message(dashboardStatus, "Refreshing dashboard...");
    await Promise.all([
      loadStats(),
      loadAppointments(),
      loadMessages()
    ]);
    message(dashboardStatus, "Dashboard is up to date.", "success");
  }

  document.querySelectorAll(".kadmin-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.tab;

      document.querySelectorAll(".kadmin-tab").forEach((tab) => {
        tab.classList.toggle("active", tab === button);
      });

      document.getElementById("appointmentsPanel").hidden =
        activeTab !== "appointments";
      document.getElementById("messagesPanel").hidden =
        activeTab !== "messages";

      message(dashboardStatus, "");
    });
  });

  document.getElementById("refreshButton").addEventListener(
    "click",
    refreshAll
  );


  // ---------- SIGN OUT ----------

  document.getElementById("logoutButton").addEventListener(
    "click",
    async () => {
      await db.auth.signOut();
      adminUser = null;
      showLogin();
    }
  );


  // ---------- RESTORE SESSION ----------

  async function init() {
    if (!db) {
      showLogin();
      return;
    }

    const { data, error } = await db.auth.getSession();

    if (error || !data.session?.user) {
      showLogin();
      return;
    }

    await verifyAdmin(data.session.user);
  }

  init();
});