import React from 'react'

export default function DevErrorOverlay(){
const [err, setErr] = React.useState(null)

React.useEffect(() => {
const onErr = (event) => { setErr(event?.error || event?.message || 'Errore sconosciuto') }
const onRej = (event) => { setErr(event?.reason || 'Promise rejection') }
window.addEventListener('error', onErr)
window.addEventListener('unhandledrejection', onRej)
return () => {
window.removeEventListener('error', onErr)
window.removeEventListener('unhandledrejection', onRej)
}
}, [])


if (!err) return null
return (
<div style={{position:'fixed', inset:'12px 12px auto 12px', padding:'12px 16px', borderRadius:8,
background:'#ffeded', border:'1px solid #ff9c9c', color:'#7a0000', zIndex:9999}}>
<b>DevErrorOverlay:</b> <span style={{whiteSpace:'pre-wrap'}}>{String(err)}</span>
</div>
)
}