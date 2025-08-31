#!/usr/bin/env python3
# -- COMMENTO -- Script per correggere automaticamente i riferimenti a CustomIcons
# -- COMMENTO -- Funziona sia se CustomIcons è una cartella sia se è un singolo file (es. components/CustomIcons.jsx)

import os, sys, re, argparse, shutil
from pathlib import Path

TEXT_EXTS = {
    ".js",".jsx",".ts",".tsx",".mjs",".cjs",
    ".css",".scss",".sass",".less",
    ".html",".htm",".json",".md",".svg",".vue",".svelte"
}
ICON_FILE_EXTS = (".jsx",".tsx",".js",".ts",".mjs",".cjs")

# -- COMMENTO -- TROVA: 1) cartella 'CustomIcons'  2) file 'CustomIcons.*'
def find_customicons_dir(base: Path) -> Path | None:
    for p in base.rglob("*"):
        if p.is_dir() and p.name.lower() == "customicons":
            return p
    return None

def find_customicons_file(base: Path) -> Path | None:
    candidates = []
    for p in base.rglob("*"):
        if p.is_file() and p.suffix.lower() in ICON_FILE_EXTS and p.stem.lower() == "customicons":
            candidates.append(p)
    # -- COMMENTO -- preferisci in src/ poi components/ poi altri
    def score(p: Path) -> tuple[int,int]:
        parts = [x.lower() for x in p.parts]
        if "src" in parts: return (0, len(p.parts))
        if "components" in parts: return (1, len(p.parts))
        return (2, len(p.parts))
    candidates.sort(key=score)
    return candidates[0] if candidates else None

def is_text_file(p: Path) -> bool:
    return p.suffix.lower() in TEXT_EXTS

def rel_to_dir(from_file: Path, to_dir: Path) -> str:
    rel = os.path.relpath(to_dir, start=from_file.parent).replace("\\","/")
    return rel if rel.endswith("/") else rel + "/"

def rel_to_file(from_file: Path, to_file: Path) -> str:
    rel = os.path.relpath(to_file, start=from_file.parent).replace("\\","/")
    return rel

# -- COMMENTO -- Riscrive riferimenti quando CustomIcons è una CARTELLA
def rewrite_for_directory(content: str, relprefix: str) -> str:
    # import/require/dynamic import di "CustomIcons/...":
    pattern_literals = re.compile(r"""(['"])(?:\.*\/)*CustomIcons\/([^'"]+)\1""")
    def repl_literals(m):
        q, tail = m.group(1), m.group(2)
        return f"{q}{relprefix}{tail}{q}"
    out = pattern_literals.sub(repl_literals, content)

    # CSS url(CustomIcons/...)
    pattern_css = re.compile(r"""url\((['"]?)(?:\.*\/)*CustomIcons\/([^'")]+)\1\)""")
    def repl_css(m):
        q, tail = m.group(1), m.group(2)
        path = f"{relprefix}{tail}"
        return f"url({q}{path}{q})" if q else f"url({path})"
    out = pattern_css.sub(repl_css, out)

    # import ... from "CustomIcons" (bare folder import)
    pattern_bare = re.compile(r"""from\s+(['"])CustomIcons\1""")
    def repl_bare(m):
        q = m.group(1)
        return f"from {q}{relprefix[:-1]}{q}"
    out = pattern_bare.sub(repl_bare, out)

    # require("CustomIcons")
    pattern_req_bare = re.compile(r"""require\((['"])CustomIcons\1\)""")
    out = pattern_req_bare.sub(lambda m: f'require({m.group(1)}{relprefix[:-1]}{m.group(1)})', out)

    # import("CustomIcons")
    pattern_dyn_bare = re.compile(r"""import\((['"])CustomIcons\1\)""")
    out = pattern_dyn_bare.sub(lambda m: f'import({m.group(1)}{relprefix[:-1]}{m.group(1)})', out)

    return out

# -- COMMENTO -- Riscrive riferimenti quando CustomIcons è un FILE (es. components/CustomIcons.jsx)
def rewrite_for_file(content: str, relfile: str) -> str:
    out = content

    # 1) import ... from "CustomIcons"  -> from "<relfile>"
    pattern_bare_from = re.compile(r"""from\s+(['"])CustomIcons\1""")
    out = pattern_bare_from.sub(lambda m: f'from {m.group(1)}{relfile}{m.group(1)}', out)

    # 2) require("CustomIcons") -> require("<relfile>")
    pattern_req_bare = re.compile(r"""require\((['"])CustomIcons\1\)""")
    out = pattern_req_bare.sub(lambda m: f'require({m.group(1)}{relfile}{m.group(1)})', out)

    # 3) import("CustomIcons") -> import("<relfile>")
    pattern_dyn_bare = re.compile(r"""import\((['"])CustomIcons\1\)""")
    out = pattern_dyn_bare.sub(lambda m: f'import({m.group(1)}{relfile}{m.group(1)})', out)

    # 4) import ... from "./../something/CustomIcons" (con o senza estensione)
    pattern_path_from = re.compile(r"""from\s+(['"])(?:\.?\.?\/)*[^'"]*\/CustomIcons(?:\.(?:jsx|tsx|js|ts|mjs|cjs))?\1""")
    out = pattern_path_from.sub(lambda m: f'from {m.group(1)}{relfile}{m.group(1)}', out)

    # 5) require("./../something/CustomIcons")
    pattern_req_path = re.compile(r"""require\((['"])(?:\.?\.?\/)*[^'"]*\/CustomIcons(?:\.(?:jsx|tsx|js|ts|mjs|cjs))?\1\)""")
    out = pattern_req_path.sub(lambda m: f'require({m.group(1)}{relfile}{m.group(1)})', out)

    # 6) import("./../something/CustomIcons")
    pattern_dyn_path = re.compile(r"""import\((['"])(?:\.?\.?\/)*[^'"]*\/CustomIcons(?:\.(?:jsx|tsx|js|ts|mjs|cjs))?\1\)""")
    out = pattern_dyn_path.sub(lambda m: f'import({m.group(1)}{relfile}{m.group(1)})', out)

    # -- COMMENTO -- ATTENZIONE: qui NON tocchiamo "CustomIcons/qualcosa"
    # perché indicherebbe l'uso di una ex-cartella (icone SVG singole).
    return out

def main():
    ap = argparse.ArgumentParser(description="Fix path verso CustomIcons (cartella o file) senza spostare nulla.")
    ap.add_argument("--root", default=".", help="Root del progetto (default: .)")
    ap.add_argument("--dry-run", action="store_true", help="Mostra cosa verrebbe cambiato, senza scrivere file")
    ap.add_argument("--backup", action="store_true", help="Crea un .bak per ogni file modificato")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print(f"Root non trovata: {root}", file=sys.stderr); sys.exit(2)

    custom_dir = find_customicons_dir(root)
    custom_file = None if custom_dir else find_customicons_file(root)

    if not custom_dir and not custom_file:
        print("ERRORE: Né cartella né file 'CustomIcons' trovati in progetto.", file=sys.stderr)
        sys.exit(3)

    if custom_dir:
        print(f"Trovata CARTELLA CustomIcons: {custom_dir}")
    if custom_file:
        print(f"Trovato FILE CustomIcons: {custom_file}")

    total_hits = 0
    changed = 0
    previews = []

    for p in root.rglob("*"):
        if not p.is_file(): continue
        if not is_text_file(p): continue

        try:
            content = p.read_text(encoding="utf-8")
        except Exception:
            continue

        if "CustomIcons" not in content:
            continue

        new_content = content
        if custom_dir:
            relprefix = rel_to_dir(p, custom_dir)
            new_content = rewrite_for_directory(new_content, relprefix)

        if custom_file:
            relfile = rel_to_file(p, custom_file)
            # Normalizza rimozione estensione se nelle import non si usa estensione
            # Lasciamo l'estensione: è più compatibile in tutti i bundler
            new_content = rewrite_for_file(new_content, relfile)

        if new_content != content:
            total_hits += 1
            if args.dry_run:
                old = content.splitlines()
                new = new_content.splitlines()
                snippet = []
                for i, (o, n) in enumerate(zip(old, new), start=1):
                    if o != n and ("CustomIcons" in o or "CustomIcons" in n):
                        snippet.append(f"{p.relative_to(root)}:{i}\n  - {o.strip()}\n  + {n.strip()}")
                    if len(snippet) >= 3:
                        break
                previews.append("\n".join(snippet) if snippet else f"{p.relative_to(root)}: [aggiornato]")
            else:
                if args.backup:
                    shutil.copy2(p, p.with_suffix(p.suffix + ".bak"))
                p.write_text(new_content, encoding="utf-8")
                changed += 1

    print(f"File esaminati con riferimenti a 'CustomIcons': {total_hits}")
    if args.dry_run:
        print("[DRY RUN] Modifiche che verrebbero applicate:")
        for s in previews[:25]:
            print("-"*40)
            print(s)
    else:
        print(f"File modificati: {changed}")
        print("COMPLETATO ✅")

if __name__ == "__main__":
    main()
