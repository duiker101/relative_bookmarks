import "./index.scss";

import { renderTree, selectedFolder } from "./treeview";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

let savedBookmark: BookmarkTreeNode | null = null;

function getInput(id: string) {
	return document.getElementById(id) as HTMLInputElement;
}

chrome.runtime.onMessage.addListener(async (request) => {
	if (request.action === "saved") {
		savedBookmark = request.bookmark;
	}
});

function saveBookmark() {
	const title = getInput("title").value;
	const path = getInput("path").value;

	let hash = getInput("hash").value;
	if (hash.length > 0 && !hash.startsWith("#")) {
		hash = "#" + hash;
	}
	let query = getInput("query").value;
	if (query.length > 0 && !query.startsWith("?")) {
		query = "?" + query;
	}
	const query_mix = getInput("query-mix").checked;
	const query_override = getInput("query-override").checked;

	chrome.runtime.sendMessage({
		action: "save",
		bookmark_id: savedBookmark?.id || null,
		title,
		folder_id: selectedFolder,
		path,
		query,
		hash,
		query_mix,
		query_override,
	});
}

document.getElementById("advanced-btn")?.addEventListener("click", async () => {
	document.getElementById("advanced-panel")?.classList.toggle("open");
});

document.getElementById("cancel-btn")?.addEventListener("click", async () => {
	if (savedBookmark) {
		await chrome.bookmarks.remove(savedBookmark.id);
	}
	window.close();
});

const queryMix = document.getElementById("query-mix") as HTMLInputElement;
const queryOverride = document.getElementById("query-override") as HTMLInputElement;
queryOverride.disabled = true;

queryMix.addEventListener("click", function () {
	queryOverride.disabled = !queryMix.checked;
});

async function main() {
	const bookmarks = await chrome.bookmarks.getTree();
	const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
	const tab = activeTabs[0];
	const folders_root = document.getElementById("folders") as HTMLElement;

	renderTree(1, folders_root, bookmarks);

	const url = new URL(tab.url || "");
	getInput("title").value = "Rel: " + (tab.title || "");
	getInput("path").value = url.pathname;
	getInput("hash").value = url.hash;
	getInput("query").value = url.search;

	saveBookmark();
}

document.getElementById("add-btn")?.addEventListener("click", async () => {
	saveBookmark();
});

main();
