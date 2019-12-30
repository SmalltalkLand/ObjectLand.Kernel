export default function(){var agent = navigator.userAgent.toLowerCase();
    var isChrome = /chrome|crios/.test(agent) && ! /edge|opr\//.test(agent);
    var isBrave = isChrome && self.navigator.plugins.length === 0 && self.navigator.mimeTypes.length === 0;return isBrave}