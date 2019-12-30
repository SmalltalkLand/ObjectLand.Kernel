let scriptLocal = (text: string) => new Promise((c, e) => {
    var script = document.createElement('script');
    script.onload = c;
    script.onerror = e;
    script.text = text;
    document.head.appendChild(script);
});
export default scriptLocal