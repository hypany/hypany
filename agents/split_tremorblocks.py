#!/usr/bin/env python3
"""
Split a composite Markdown file (like TREMORBLOCKS.md) into real files.

Expected block format in the Markdown:

================================================
FILE: path/to/file.ext
================================================
<file contents until next header or EOF>

Usage examples:

- python agents/split_tremorblocks.py \
    --input agents/TREMORBLOCKS.md \
    --root tremorlabs-tremor-blocks \
    --overwrite

- Dry-run to preview without writing:
  python agents/split_tremorblocks.py --dry-run

Notes:
- If --root is provided, output files are written under that directory.
- If a file already exists, the script skips it unless --overwrite is set.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import Iterable, List, Optional


HEADER_RE = re.compile(r"^={3,}\nFILE:\s*(?P<path>.*?)\n={3,}\n", re.M)


@dataclass
class FileBlock:
    path: str
    content: str


def parse_blocks(md_text: str) -> List[FileBlock]:
    """Parse the Markdown text and extract file blocks.

    Returns a list of FileBlock objects with relative paths and contents.
    """
    blocks: List[FileBlock] = []

    # Find headers and slice content between them
    matches = list(HEADER_RE.finditer(md_text))
    for i, m in enumerate(matches):
        path = m.group("path").strip()
        start = m.end()  # content starts after header
        end = matches[i + 1].start() if i + 1 < len(matches) else len(md_text)
        content = md_text[start:end]

        # Trim a single leading newline if present (cosmetic)
        if content.startswith("\n"):
            content = content[1:]

        blocks.append(FileBlock(path=path, content=content))

    return blocks


def write_block(root: str, block: FileBlock, overwrite: bool = False) -> str:
    """Write a single file block to disk. Returns the absolute path written/skipped."""
    # Normalize path to avoid path traversal
    rel_path = os.path.normpath(block.path)
    # Disallow escaping the root via ..
    if rel_path.startswith(".."):
        raise ValueError(f"Refusing to write outside root: {block.path}")

    out_path = os.path.join(root, rel_path) if root else rel_path
    out_dir = os.path.dirname(out_path)
    if out_dir and not os.path.exists(out_dir):
        os.makedirs(out_dir, exist_ok=True)

    if os.path.exists(out_path) and not overwrite:
        return out_path  # skipped

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(block.content)

    return out_path


def detect_default_root(md_text: str) -> Optional[str]:
    """Attempt to detect a reasonable default root directory from the directory tree preface."""
    # Heuristic: find a line that looks like "└── some-root/" or "tremorlabs-.../" near the top
    for line in md_text.splitlines()[:200]:
        line = line.strip()
        if line.endswith("/") and ("tremorlabs" in line or line.startswith("└── ")):
            # Extract the last segment ending with a slash
            candidate = line.split()[-1]
            # Remove tree drawing characters
            candidate = candidate.replace("└──", "").strip()
            # Final sanity: must end with '/'
            if candidate.endswith("/"):
                return candidate.rstrip("/")
    return None


def main(argv: Optional[Iterable[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Split TREMORBLOCKS-style Markdown into files")
    parser.add_argument(
        "--input",
        default=os.path.join("agents", "TREMORBLOCKS.md"),
        help="Path to the composite Markdown file",
    )
    parser.add_argument(
        "--root",
        default=None,
        help="Destination root directory to write files under (default: current dir)",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing files if they already exist",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Only print what would be written without modifying the filesystem",
    )

    args = parser.parse_args(list(argv) if argv is not None else None)

    with open(args.input, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Parse blocks
    blocks = parse_blocks(md_text)
    if not blocks:
        print("No file blocks found. Ensure the file uses the expected header format.", file=sys.stderr)
        return 1

    # Determine root
    root = args.root
    if root is None:
        detected = detect_default_root(md_text)
        root = detected or "."

    # Ensure root exists when not dry-run
    if not args.dry_run and root and not os.path.exists(root):
        os.makedirs(root, exist_ok=True)

    # Report plan
    print(f"Found {len(blocks)} files. Writing under root: {os.path.abspath(root)}")
    wrote, skipped = 0, 0
    for i, block in enumerate(blocks, 1):
        if args.dry_run:
            print(f"[{i}/{len(blocks)}] WOULD WRITE: {os.path.join(root, os.path.normpath(block.path))}")
            continue

        out_path = write_block(root, block, overwrite=args.overwrite)
        if os.path.exists(out_path):
            # Differentiate between overwrite/creation vs skip
            if args.overwrite or not os.path.exists(out_path):
                wrote += 1
            else:
                skipped += 1
        print(f"[{i}/{len(blocks)}] WROTE: {out_path}")

    if args.dry_run:
        print("Dry-run complete.")
    else:
        print(f"Done. Wrote {wrote} file(s). Skipped {skipped}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

