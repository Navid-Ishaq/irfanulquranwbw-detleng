"""Validate the presence and naming of the three Verse-by-Verse DOCX collections."""
from pathlib import Path
root = Path(__file__).resolve().parents[1] / 'data'
collections = [
    ('Urdu + English', 'verse-bilingual', 'IQV'),
    ('Urdu Only', 'verse-urdu', 'UR-IQV'),
    ('English Only', 'verse-english', 'EN-IQV'),
]
count = 0
for label, folder, prefix in collections:
    expected = [root / folder / f'{prefix}-Para-{p:02d}-{q:02d}.docx'
                for p in range(1, 31) for q in range(1, 5)]
    present = [path for path in expected if path.is_file()]
    missing = [path for path in expected if not path.is_file()]
    count += len(present)
    print(f'{label}: {len(present)}/120 files in data/{folder}/')
    if missing:
        print(f'  {len(missing)} pending, e.g. {missing[0].name}')
print(f'Grand total: {count}/360 DOCX files')
