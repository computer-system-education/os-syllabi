var references = null;

window.onload = function() {
    var hdr = document.createElement("div");
    hdr.className = "jump-hdr";

    document.body.insertBefore(hdr, document.body.firstChild);

    var sections = headerAddSection(hdr, "Sections");
    var exercises = headerAddSection(hdr, "Exercises");

    // Add sections and exercises
    var nodes = document.body.childNodes;
    var headers = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType !== 1)
            continue;

        if (nodes[i].tagName.match(/[hH][1-3]/)) {
            // Section
            var depth = parseInt(nodes[i].tagName[1]) - 1;
            // Skip the top title
            if (depth === 0)
                continue;
            var link = sectionAddLink(sections, nodes[i].textContent,
                                      elementURL(nodes[i]), depth + "em");
            headers.push({h: nodes[i], link: link});
        } else if (nodes[i].tagName.toLowerCase() === "div" &&
                   nodes[i].className.match(/\brequired\b/)) {
            // Exercise
            var text = nodes[i].getElementsByTagName("span")[0].textContent;
            text = text.replace(/\.$/, "");
            var link = document.createElement("div");
            link.id = text.replace(/[^a-zA-Z0-9.]/g, "-");
            link.style.position = "relative";
            link.style.top = "-5em";
            nodes[i].insertBefore(link, nodes[i].childNodes[0]);
            sectionAddLink(exercises, text, elementURL(link));
        }
    }

    // Add references
    var refs = headerAddSection(hdr, "References");
    if (references) {
        for (var i = 0; i < references.length; i++)
            sectionAddLink(refs, references[i][0], references[i][1]);
    }
    sectionAddLink(refs, "Lab tools guide", "../../labguide.html");
    sectionAddLink(refs, "80386 manual", "../../readings/i386/toc.htm");
    sectionAddLink(refs, "IA32");
    sectionAddLink(refs, "Basic architecture", "../../readings/ia32/IA32-1.pdf", "1em");
    sectionAddLink(refs, "Instruction set A-M", "../../readings/ia32/IA32-2A.pdf", "1em");
    sectionAddLink(refs, "Instruction set N-Z", "../../readings/ia32/IA32-2B.pdf", "1em");
    sectionAddLink(refs, "System programming 1", "../../readings/ia32/IA32-3A.pdf", "1em");
    sectionAddLink(refs, "System programming 2", "../../readings/ia32/IA32-3B.pdf", "1em");

    // Highlight the current section
    var lastHL = headers[0].link;
    window.onscroll = function() {
        lastHL.style.background = "";
        var last = headers[0];
        for (var i = 0; i < headers.length; i++) {
            if (getTop(headers[i].h) > window.pageYOffset)
                break;
            last = headers[i];
        }
        lastHL = last.link;
        lastHL.style.background = "#c0c0ff";
    };
    window.onscroll();
};

function headerAddSection(hdr, name) {
    var section = document.createElement("div");
    section.className = "jump-section";
    section.textContent = name + " \u25BF";
    hdr.appendChild(section);
    var drop = document.createElement("div");
    drop.className = "jump-drop";
    section.appendChild(drop);
    return drop;
}

function sectionAddLink(section, text, url, indent) {
    var link = document.createElement(url ? "a" : "div");
    link.href = url;
    link.textContent = text;
    if (indent !== undefined)
        link.style.paddingLeft = indent;
    section.appendChild(link);
    return link;
}

function elementURL(elt) {
    if (!elt.id)
        elt.id = elt.textContent.replace(/[^a-zA-Z0-9.]/g, "-");
    return "#" + elt.id;
}

function getTop(elt) {
    var curTop = 0;
    if (elt.offsetParent) {
        do {
            curTop += elt.offsetTop;
        } while (elt = elt.offsetParent);
    }
    return curTop;
}

