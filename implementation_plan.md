# Implementation Plan: Making Agro Bazar Completely Functional

## Goal Description
We will turn the placeholder/dummy features in the UI (Dashboard, Job Applications, Tool Requests) into fully functioning endpoints connecting the React frontend to the Express backend.

## Proposed Changes

### Backend Models
#### [NEW] [application.js](file:///c:/Users/harsh/OneDrive/Desktop/FARM/backend/models/application.js)
Stores an applicant's interest in a specific Labour Job.
- `jobId`: Refers to LabourJob.
- `applicantId`: Refers to User.
- `status`: Enum (Pending, Accepted, Rejected).

#### [NEW] [request.js](file:///c:/Users/harsh/OneDrive/Desktop/FARM/backend/models/request.js)
Stores a user's request to rent/buy a previously posted Tool.
- `productId`: Refers to Product.
- `requesterId`: Refers to User.
- `status`: Enum (Pending, Accepted, Rejected).

---

### Backend Routes & Controllers
#### [MODIFY] [user.js (routes)](file:///c:/Users/harsh/OneDrive/Desktop/FARM/backend/routes/user.js)
- Add POST `/apply-job/:jobId`
- Add POST `/request-tool/:productId`
- Add POST `/application/:appId/status` (for accept/reject)

#### [MODIFY] [static_restrict.js](file:///c:/Users/harsh/OneDrive/Desktop/FARM/backend/routes/static_restrict.js)
- Modify GET `/dashboard` to populate the user's posted jobs & tools, and the applications they have received/submitted.

---

### Frontend Pages
#### [MODIFY] [FindWorkPage.jsx](file:///c:/Users/harsh/OneDrive/Desktop/FARM/src/pages/FindWorkPage.jsx)
- Add "Apply" button to each dummy job card.
- Button triggers POST `/apply-job/:jobId` via Axios.

#### [MODIFY] [RentBuyToolsPage.jsx](file:///c:/Users/harsh/OneDrive/Desktop/FARM/src/pages/RentBuyToolsPage.jsx)
- Modify "Request" button to trigger POST `/request-tool/:productId`.

#### [MODIFY] [DashboardPage.jsx](file:///c:/Users/harsh/OneDrive/Desktop/FARM/src/pages/DashboardPage.jsx)
- Replace hardcoded JSON state with a `useEffect` that fetches real data from `/dashboard`.
- Render real accepted/rejected status buttons.

## Verification Plan
### Manual Verification
1. I will use the browser/notify to log in as a testing user.
2. Produce a test job and a test tool.
3. Log in as a different user to request the tool and apply for the job.
4. Log back in as the first user to view the Dashboard and hit "Accept".
