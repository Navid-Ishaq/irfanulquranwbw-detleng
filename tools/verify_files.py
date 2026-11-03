from pathlib import Path
base=Path(__file__).resolve().parents[1]/"data"/"docx"
paths=[base/f"IQ-Para-{p:02d}-{q:02d}.docx" for p in range(1,31) for q in range(1,5)]
found=[p for p in paths if p.is_file()]
missing=[p for p in paths if not p.is_file()]
print(f"Found {len(found)}/120 section files")
for p in missing:print("MISSING",p.name)
