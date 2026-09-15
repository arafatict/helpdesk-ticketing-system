const STORAGE_KEY = 'northstar-desk-tickets-v2';
const seedTickets = [
  { id: 'INC-1042', title: 'Wi-Fi disconnects after sleep', requester: 'A. Rahman', category: 'Network', priority: 'high', status: 'open', description: 'User reports intermittent connectivity after waking a laptop.', notes: 'Check adapter power-management settings and collect driver version.', assignee: 'IT Support Team', createdAt: '2026-09-10T09:15:00.000Z', updatedAt: '2026-09-10T09:15:00.000Z' },
  { id: 'REQ-1041', title: 'Microsoft 365 access request', requester: 'S. Khan', category: 'Account & access', priority: 'medium', status: 'progress', description: 'Request to restore access to a shared mailbox.', notes: 'Verify group membership and confirm requested access scope.', assignee: 'A. Support', createdAt: '2026-09-09T13:30:00.000Z', updatedAt: '2026-09-09T15:00:00.000Z' },
  { id: 'INC-1038', title: 'Printer queue is stuck', requester: 'M. Ali', category: 'Hardware', priority: 'low', status: 'resolved', description: 'Office printer jobs were not leaving the queue.', notes: 'Restarted print spooler and cleared the blocked queue.', assignee: 'IT Support Team', createdAt: '2026-09-08T10:05:00.000Z', updatedAt: '2026-09-08T11:10:00.000Z' }
];
const $ = (selector) => document.querySelector(selector);
const form = $('#ticket-form');
const modal = $('#ticket-modal');
const modalTitle = $('#modal-title');
const submitButton = $('#ticket-submit');
let tickets = loadTickets();

function loadTickets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedTickets.map((ticket) => ({ ...ticket }));
  } catch {
    return seedTickets.map((ticket) => ({ ...ticket }));
  }
}
function saveTickets() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)); }
function nowIso() { return new Date().toISOString(); }
function formatDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function render() {
  const query = $('#search').value.trim().toLowerCase();
  const statusFilter = $('#status-filter').value;
  const priorityFilter = $('#priority-filter').value;
  const filtered = tickets.filter((ticket) => {
    const searchable = `${ticket.id} ${ticket.title} ${ticket.requester} ${ticket.category} ${ticket.description} ${ticket.notes} ${ticket.assignee}`.toLowerCase();
    return (!query || searchable.includes(query)) && (statusFilter === 'all' || ticket.status === statusFilter) && (priorityFilter === 'all' || ticket.priority === priorityFilter);
  });
  $('#open-count').textContent = tickets.filter((ticket) => ticket.status === 'open').length;
  $('#progress-count').textContent = tickets.filter((ticket) => ticket.status === 'progress').length;
  $('#resolved-count').textContent = tickets.filter((ticket) => ticket.status === 'resolved').length;
  $('#high-count').textContent = tickets.filter((ticket) => ticket.priority === 'high').length;
  $('#empty-state').hidden = filtered.length !== 0;
  $('#ticket-list').innerHTML = filtered.map((ticket) => `<article class="ticket"><div><div class="ticket-title">${escapeHtml(ticket.title)}</div><div class="ticket-meta">${escapeHtml(ticket.id)} · ${escapeHtml(ticket.requester)} · ${escapeHtml(ticket.category)}</div></div><span class="badge badge-${escapeHtml(ticket.status)}">${statusLabel(ticket.status)}</span><span class="priority-${escapeHtml(ticket.priority)}">${escapeHtml(capitalize(ticket.priority))} priority</span><span class="ticket-meta">${escapeHtml(ticket.assignee || 'Unassigned')} · Created ${formatDate(ticket.createdAt)} · Updated ${formatDate(ticket.updatedAt || ticket.createdAt)}</span><div class="ticket-actions"><button data-edit="${escapeHtml(ticket.id)}">Update</button></div></article>`).join('');
}
function statusLabel(status) { return ({ open: 'Open', progress: 'In progress', resolved: 'Resolved' })[status] || 'Open'; }
function capitalize(value) { return value.charAt(0).toUpperCase() + value.slice(1); }
function openCreateModal() { form.reset(); form.elements.id.value = ''; form.elements.status.value = 'open'; modalTitle.textContent = 'Create a ticket'; submitButton.textContent = 'Create ticket'; modal.hidden = false; form.elements.requester.focus(); }
function openEditModal(ticket) { form.elements.id.value = ticket.id; form.elements.requester.value = ticket.requester; form.elements.title.value = ticket.title; form.elements.category.value = ticket.category; form.elements.priority.value = ticket.priority; form.elements.status.value = ticket.status; form.elements.assignee.value = ticket.assignee || ''; form.elements.description.value = ticket.description; form.elements.notes.value = ticket.notes || ''; modalTitle.textContent = `Update ${ticket.id}`; submitButton.textContent = 'Save changes'; modal.hidden = false; form.elements.title.focus(); }
function closeModal() { modal.hidden = true; form.reset(); form.elements.id.value = ''; }
$('#new-ticket').addEventListener('click', openCreateModal);
$('#reset-data').addEventListener('click', () => { tickets = seedTickets.map((ticket) => ({ ...ticket })); saveTickets(); render(); });
document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
['#search', '#status-filter', '#priority-filter'].forEach((selector) => $(selector).addEventListener('input', render));
$('#ticket-list').addEventListener('click', (event) => { const ticket = tickets.find((item) => item.id === event.target.dataset.edit); if (ticket) openEditModal(ticket); });
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form); const timestamp = nowIso(); const id = data.get('id');
  const values = { requester: data.get('requester').trim(), title: data.get('title').trim(), category: data.get('category'), priority: data.get('priority'), status: data.get('status'), assignee: data.get('assignee').trim(), description: data.get('description').trim(), notes: data.get('notes').trim() };
  if (id) { const ticket = tickets.find((item) => item.id === id); Object.assign(ticket, values, { updatedAt: timestamp }); } else { tickets.unshift({ id: `REQ-${String(Date.now()).slice(-5)}`, ...values, createdAt: timestamp, updatedAt: timestamp }); }
  saveTickets(); render(); closeModal();
});
render();
