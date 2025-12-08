---
description: Workflow untuk mencatat progress dan menyimpan ke memory project
---

# Update Project Memory

This workflow saves development progress and important decisions to the project memory.

## When to Use

Run this workflow after:
- Completing a new feature
- Fixing a bug
- Making architectural changes
- Taking important technical decisions
- Ending a work session

## Steps

### 1. Read Current Memory
// turbo
Read the latest progress from `.agent/memory/progress-log.md`:
```
view_file d:\WebstormProject\puasa-ayyamul-bidh\.agent\memory\progress-log.md
```

### 2. Add New Entry
Append a new entry to `progress-log.md` using this format:

```markdown
## [DATE] - [SHORT TITLE]

### What Was Done
- [Brief description of task 1]
- [Brief description of task 2]

### Files Changed
- `path/to/file1.js` - [reason for change]
- `path/to/file2.css` - [reason for change]

### Technical Decisions
- [Important decision made and why]

### Status
- [x] Completed / [ ] In Progress / [ ] Blocked

### Notes for Next Session
- [What needs to be continued]
- [Known bugs not yet fixed]
- [Ideas for improvement]

---
```

### 3. Update Decisions Log (Optional)
If important architectural/technical decisions were made, also record them in `.agent/memory/decisions.md`

### 4. Confirm
Ensure the file is saved and notify the user that memory has been updated.

## Memory Folder Structure

```
.agent/memory/
├── bahasa-indonesia.md    # Language rules (communicate in Indonesian)
├── progress-log.md        # Development progress log (newest first)
├── project-summary.md     # Complete project implementation summary
├── decisions.md           # Important architectural/technical decisions
└── known-issues.md        # Known bugs and issues
```

## Best Practices

1. **Keep notes concise** - Focus on information useful for the next session
2. **Use consistent format** - Follow the template above
3. **Prioritize important info** - No need to log every small detail
4. **Update regularly** - Don't wait until the end, log as you work
5. **Newest entries first** - Always add new entries at the top of the log
