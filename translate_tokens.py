#!/usr/bin/env python3
import sys
import json
import re

if len(sys.argv) != 4:
    print("Usage: python3 translate_tokens.py input.html translations.json output.html")
    sys.exit(2)

in_path, trans_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

with open(trans_path, "r", encoding="utf-8") as f:
    translations = json.load(f)

with open(in_path, "r", encoding="utf-8") as f:
    s = f.read()

for k, v in translations.items():
    token = r"\{\{\s*ABC:" + re.escape(k) + r"\s*\}\}"
    s = re.sub(token, v, s)

with open(out_path, "w", encoding="utf-8") as f:
    f.write(s)
