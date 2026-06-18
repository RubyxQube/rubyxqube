"""
Fix mojibake caused by PowerShell reading UTF-8 files as CP1252 then re-saving.

Uses binary byte replacement — no string encoding ambiguity.
Each bad_bytes entry is the UTF-8 encoding of the 3 CP1252 characters that
result from misreading the original 3 UTF-8 bytes.
"""
import os, glob

# (corrupted_bytes, correct_bytes)
# Derivation: original_utf8 -> misread as CP1252 -> 3 unicode chars -> re-encoded to UTF-8
FIXES = [
    # en-dash U+2013 (E2 80 93): CP1252 reads as U+00E2 U+20AC U+201C
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9c', b'\xe2\x80\x93'),
    # em-dash U+2014 (E2 80 94): CP1252 reads as U+00E2 U+20AC U+201D
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9d', b'\xe2\x80\x94'),
    # right single quote U+2019 (E2 80 99): CP1252 reads as U+00E2 U+20AC U+2122
    (b'\xc3\xa2\xe2\x82\xac\xe2\x84\xa2', b'\xe2\x80\x99'),
    # left single quote U+2018 (E2 80 98): CP1252 reads as U+00E2 U+20AC U+02DC
    (b'\xc3\xa2\xe2\x82\xac\xcb\x9c',    b'\xe2\x80\x98'),
    # bullet U+2022 (E2 80 A2): CP1252 reads as U+00E2 U+20AC U+00A2
    (b'\xc3\xa2\xe2\x82\xac\xc2\xa2',    b'\xe2\x80\xa2'),
    # ellipsis U+2026 (E2 80 A6): CP1252 reads as U+00E2 U+20AC U+00A6
    (b'\xc3\xa2\xe2\x82\xac\xc2\xa6',    b'\xe2\x80\xa6'),
    # checkmark U+2713 (E2 9C 93): CP1252 reads as U+00E2 U+0153 U+201C
    (b'\xc3\xa2\xc5\x93\xe2\x80\x9c',    b'\xe2\x9c\x93'),
    # NE arrow U+2197 (E2 86 97): CP1252 reads as U+00E2 U+2020 U+2014
    # Process BEFORE em-dash to avoid the em-dash bytes at end being double-processed
    (b'\xc3\xa2\xe2\x80\xa0\xe2\x80\x94', b'\xe2\x86\x97'),
    # up arrow U+2191 (E2 86 91): CP1252 reads as U+00E2 U+2020 U+2018
    (b'\xc3\xa2\xe2\x80\xa0\xe2\x80\x98', b'\xe2\x86\x91'),
    # right arrow U+2192 (E2 86 92): CP1252 reads as U+00E2 U+2020 U+2019
    (b'\xc3\xa2\xe2\x80\xa0\xe2\x80\x99', b'\xe2\x86\x92'),
    # down arrow U+2193 (E2 86 93): CP1252 reads as U+00E2 U+2020 U+201C
    (b'\xc3\xa2\xe2\x80\xa0\xe2\x80\x9c', b'\xe2\x86\x93'),
    # box drawing U+2500 (E2 94 80): CP1252 reads as U+00E2 U+201D U+20AC
    (b'\xc3\xa2\xe2\x80\x9d\xe2\x82\xac', b'\xe2\x94\x80'),
]

src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src')
files = glob.glob(os.path.join(src_dir, '**', '*.jsx'), recursive=True)
files += glob.glob(os.path.join(src_dir, '**', '*.js'), recursive=True)

total_files = 0
total_replacements = 0

for path in files:
    with open(path, 'rb') as f:
        data = f.read()
    original = data
    replacements = 0
    for bad, good in FIXES:
        count = data.count(bad)
        if count:
            data = data.replace(bad, good)
            replacements += count
    if data != original:
        with open(path, 'wb') as f:
            f.write(data)
        rel = os.path.relpath(path, src_dir)
        print(f'  Fixed {replacements:3d} occurrences  {rel}')
        total_files += 1
        total_replacements += replacements

print(f'\nDone: {total_replacements} replacements in {total_files} files.')
