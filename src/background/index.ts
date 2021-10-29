import "../img/icon_32.png";
import "../img/icon_128.png";
import "../img/icon_512.png";

// @ts-ignore
import bookmarklet from "./bookmarklet.js";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

interface SaveRequest {
	title: string;
	path: string;
	query: string;
	hash: string;
	query_mix: boolean;
	query_override: boolean;
}

let bookmark: BookmarkTreeNode | null = null;
async function createRelativeBookmark(
	bookmark_id: string | null,
	folder_id: string,
	title: string,
	request: SaveRequest
) {
	const base_data = btoa(JSON.stringify(request));
	const javascript_url = `javascript:${bookmarklet};relative_mark_101("${base_data}")`;

	if (bookmark_id && bookmark) {
		if (folder_id !== bookmark.parentId) {
			await chrome.bookmarks.move(bookmark_id, { parentId: folder_id });
		}

		bookmark = await chrome.bookmarks.update(bookmark_id, {
			title: title,
			url: javascript_url,
		});
	} else {
		bookmark = await chrome.bookmarks.create({
			parentId: folder_id,
			title: title,
			url: javascript_url,
		});
	}

	chrome.runtime.sendMessage({ action: "saved", bookmark });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	const { action, ...request_data } = request;
	console.log("bg msg", request)
	if (action === "save") {
		const { folder_id, bookmark_id, title, ...save_data } = request_data;
		await createRelativeBookmark(bookmark_id, folder_id, title, save_data);
	}
});
