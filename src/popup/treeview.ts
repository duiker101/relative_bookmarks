import "./treeview.scss";

import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export let selectedFolder: string | null = null;

export function renderTree(depth: number, div: HTMLElement, bookmarks: BookmarkTreeNode[]) {
	let total = 0;
	for (const bookmark of bookmarks) {
		if (bookmark.children) {
			total += 1;
			const newDiv = document.createElement("div");
			const titleDiv = document.createElement("div");
			const listDiv = document.createElement("div");
			div.append(newDiv);
			newDiv.append(titleDiv);
			newDiv.append(listDiv);

			titleDiv.classList.add("title");
			titleDiv.innerHTML = depth === 1 ? "Bookmarks" : bookmark.title;

			if (bookmark.id !== "0" && selectedFolder === null) {
				titleDiv.classList.add("selected");
				selectedFolder = bookmark.id;
			}
			titleDiv.addEventListener("click", () => {
				newDiv.classList.toggle("open");
				selectedFolder = bookmark.id;

				if (bookmark.id !== "0") {
					document.querySelector(".title.selected")?.classList.remove("selected");
					titleDiv.classList.add("selected");
				}
			});

			listDiv.classList.add("children");
			if (depth == 1) {
				newDiv.classList.add("open");
			}

			const renderedChildren = renderTree(depth + 1, listDiv, bookmark.children);

			if (renderedChildren > 0) {
				newDiv.classList.add("expandable");
			}
		}
	}

	return total;
}
