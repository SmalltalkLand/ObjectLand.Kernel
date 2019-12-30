let script = (name: string) => new Promise((c, e) => {
    var script = document.createElement('script');
    script.onload = c;
    script.onerror = e;
    script.src = name;
    document.head.appendChild(script);
});
export default script
