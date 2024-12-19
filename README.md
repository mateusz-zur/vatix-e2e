# My approach
1. I set a timer for 2 hours. Within that 2 hours I've created list of manual tests and one End-to-End automated test.
2. In E2E test I wanted to cover the most important things of incident reporting form. There's a possibility to create more automated tests - but it dependes on approach to automation in the project. Covering 100% functionalities and cases by UI automated tests is useless in most of the projects.
3. I implemented page model object which is redundant in this simple case, but to show there's such option. 

# Manual tests
- **As a reporter, I can report an incident with all fields filled in “General Details section” and add one comment and one attachment.** (covered in automated tests)
- As a reporter, I can’t report an incident without mandatory fields and I should see an error when I try to do that
- As a reporter, I can change dates and times in calendar widget.
- As a reporter, when I have a value in date/time and single select fields, I can click “X” icon to clear a field
- As a reporter, when I select a “Near Miss” as a type, then I should see additional multi select field “Cause of Injury or Near Miss”
- As a reporter, when I select a “First Aid Injury” as a type, then I should see additional section “Accident Details” 

