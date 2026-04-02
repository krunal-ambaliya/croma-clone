
# Chrome Disable Web Security

## Command

```bash
chrome.exe --disable-web-security --user-data-dir="C:/temp"
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `--disable-web-security` | Disables same-origin policy enforcement |
| `--user-data-dir` | Specifies custom user data directory |

## Usage

Run this command to launch Chrome with web security disabled and a temporary user profile.

### ⚠️ Warning
Only use this for development/testing. This reduces security significantly.
