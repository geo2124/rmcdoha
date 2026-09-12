# Replace demo content with verified RMC data

## Goal
Make the patient-facing demo feel authentic using information published by Royal Medical Center, while clearly separating official facts from simulated demo availability and analytics.

## Changes
- Replace the placeholder shield with the official RMC logo from the clinic website, stored through the project asset system.
- Replace the fictional doctor roster with the current roster shown on RMC’s official “Our Doctors” page.
- Use published doctor titles, services, and profile photos where available; show a polished placeholder when the official site has no photo.
- Replace the specialty directory with RMC’s published departments, including Psychiatry and Pharmacy & Laboratory Exams where appropriate.
- Correct the branch names and addresses to Al Hilal and Al Gharrafa, and keep the verified appointment lines: +974 4450 2050 and +974 4460 2060.
- Update doctor cards, profiles, filters, booking, and management screens so they do not claim unverified doctor languages, experience, insurance, branch assignments, or live schedules.
- Keep appointment dates, times, request references, and management figures visibly marked as simulated; the official website does not publish live appointment availability.
- Update stale sample appointment and doctor-demand rows so no fictional doctors remain.

## Technical details
- Keep the existing local demo flow and data shape, but make unverified doctor fields optional and render only verified details.
- Source the roster from the official doctors-page body, which appears newer than the sitewide menu; preserve source links on doctor records for traceability.
- Verify compilation and test the doctor directory, profile, booking, logo, and mobile layout in the running preview.
