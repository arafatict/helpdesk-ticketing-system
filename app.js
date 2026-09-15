const STORAGE_KEY='northstar-desk-tickets-v1';
const seedTickets=[
 {id:'INC-1042',title:'Wi-Fi disconnects after sleep',requester:'A. Rahman',category:'Network',priority:'high',status:'open',description:'User reports intermittent connectivity after waking a laptop.',updated:'Today'},
 {id:'REQ-1041',title:'Microsoft 365 access request',requester:'S. Khan',category:'Account & access',priority:'medium',status:'progress',description:'Request to restore access to a shared mailbox.',updated:'Yesterday'},
 {id:'INC-1038',title:'Printer queue is stuck',requester:'M. Ali',category:'Hardware',priority:'low',status:'resolved',description:'Office printer jobs were not leaving the queue.',updated:'2 days ago'}
];
const $=s=>document.querySelector(s);
let tickets=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')||seedTickets;
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(tickets));
const statusLabel={open:'Open',progress:'In progress',resolved:'Resolved'};
function render(){
 const q=$('#search').value.toLowerCase(), sf=$('#status-filter').value, pf=$('#priority-filter').value;
 const filtered=tickets.filter(t=>(!q||`${t.id} ${t.title} ${t.requester} ${t.category}`.toLowerCase().includes(q))&&(sf==='all'||t.status===sf)&&(pf==='all'||t.priority===pf));
 $('#open-count').textContent=tickets.filter(t=>t.status==='open').length;$('#progress-count').textContent=tickets.filter(t=>t.status==='progress').length;$('#resolved-count').textContent=tickets.filter(t=>t.status==='resolved').length;$('#high-count').textContent=tickets.filter(t=>t.priority==='high').length;
 $('#empty-state').hidden=filtered.length!==0;
 $('#ticket-list').innerHTML=filtered.map(t=>`<article class="ticket"><div><div class="ticket-title">${escapeHtml(t.title)}</div><div class="ticket-meta">${t.id} · ${escapeHtml(t.requester)} · ${escapeHtml(t.category)}</div></div><span class="badge badge-${t.status}">${statusLabel[t.status]}</span><span class="priority-${t.priority}">${t.priority[0].toUpperCase()+t.priority.slice(1)} priority</span><span class="ticket-meta">${escapeHtml(t.updated)}</span><div class="ticket-actions"><button data-next="${t.id}">Update</button></div></article>`).join('');
}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function openModal(){ $('#ticket-modal').hidden=false; $('#ticket-form input').focus(); }
function closeModal(){ $('#ticket-modal').hidden=true; $('#ticket-form').reset(); }
$('#new-ticket').addEventListener('click',openModal);document.querySelectorAll('[data-close-modal]').forEach(e=>e.addEventListener('click',closeModal));
$('#reset-data').addEventListener('click',()=>{tickets=seedTickets.map(t=>({...t}));save();render();});
['#search','#status-filter','#priority-filter'].forEach(s=>$(s).addEventListener('input',render));
$('#ticket-list').addEventListener('click',e=>{const id=e.target.dataset.next;if(!id)return;const t=tickets.find(x=>x.id===id);if(t){t.status=t.status==='open'?'progress':t.status==='progress'?'resolved':'open';t.updated='Just now';save();render();}});
$('#ticket-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);tickets.unshift({id:`REQ-${String(Date.now()).slice(-4)}`,title:data.get('title'),requester:data.get('requester'),category:data.get('category'),priority:data.get('priority'),status:'open',description:data.get('description'),updated:'Just now'});save();render();closeModal();});
render();
