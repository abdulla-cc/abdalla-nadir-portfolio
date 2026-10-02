# Portfolio audit — 3 October 2026

Repository: [abdulla-cc/abdalla-nadir-portfolio](https://github.com/abdulla-cc/abdalla-nadir-portfolio)

Baseline: `92ca8a9066dee6d0c8514b531b42696fd3faf3be`.

The portfolio has substantial project breadth, but its biggest weakness was credibility: some descriptions presented exploratory or heuristic work as validated prediction. The site also had reproducible contact, keyboard, mobile, and animation problems. This change fixes the confirmed portfolio issues below while keeping the existing design.

## Confirmed findings and repairs

| Priority | Finding | Repair / evidence |
| --- | --- | --- |
| High | Contact form treated any HTTP 200 response as success, including provider rejection, then erased the message. | Reproduced against the baseline. Success now requires an explicit provider acknowledgement. Rejection, malformed JSON, HTTP errors, network errors and timeouts preserve input. |
| High | Case-study dialogs left keyboard users on the background page, did not trap or restore focus, and had a generic accessible name. | Focus enters the title, stays in the dialog, and returns to the opener. Background is inert until dismissal; Escape, close button and backdrop dismiss it. |
| High | DecisionOS called heuristic scores calibrated probabilities. | Descriptions now distinguish reproducible option rankings from calibrated outcome probabilities and explain the confidence heuristic. Source reviewed: [DecisionOS](https://github.com/abdulla-cc/Decision_OS). |
| High | HR pipeline described 113 historical departures as employees flagged before leaving. | Corrected to a retrospective low-income/departure segment. Count versus rate and association versus causation are distinguished. Source reviewed: [HR Analytics Pipeline](https://github.com/abdulla-cc/HR-Analytics-Pipeline). |
| High | Diabetes copy and its graphic claimed “82% accuracy on the minority class,” without a reproducible definition or evaluation artifact. | Removed the ambiguous metric from displayed copy and stopped displaying the metric graphic. The notebooks are described as educational classifiers; future-onset and clinical-use claims were removed. |
| Medium | Four vulnerable development dependencies were reported by the initial npm audit. | Compatible lockfile updates resolved baseline-browser-mapping, browserslist, nanoid and postcss advisories. Final audit: zero known vulnerabilities at the time checked. This is not a guarantee against undisclosed vulnerabilities. |
| Medium | Contact/education grid overflowed at 320px; header links crowded mobile/tablet widths. | Flexible grid constraints, wrapping contact values, smaller header layout, and a later desktop-navigation breakpoint. Browser checks cover 320, 375 and 768px. |
| Medium | Mobile menu lacked state/relationship attributes, Escape handling and predictable focus. | Added expanded/controls attributes, focus on open, Escape restoration, outside/blur dismissal, and focus on the selected section. |
| Medium | Tall sections could never satisfy the navigation observer threshold. | Active navigation now follows section position relative to the sticky header. Added anchor scroll margins, a skip link, and keyboard-aware Back to top. |
| Medium | Shader used window dimensions and applied pixel density twice to the viewport, leaked setup resources, and kept rendering offscreen. | Sizes to the hero canvas; bounds render density; releases buffers/programs/shaders; pauses offscreen/hidden; recovers after context loss. Tests exercise high DPI, context loss, theme remounting, and offscreen pause/resume. |
| Medium | Reduced-motion users still received typing/reveal/splash effects; changing the setting did not update mounted components. | Added a reactive media-query hook, immediate content for reduced motion, and a still shader. The installed Framer Motion 11 hook retained only its initial value. |
| Medium | Terminal text could clip at narrow widths and used a low-contrast theme token on a permanently dark background. | Content determines height, typing reserves its final space, and terminal colors stay readable in either theme. |
| Medium | Invalid localStorage theme values were stamped directly onto the document. | Validates saved values, falls back to system preference, tolerates unavailable storage, and synchronizes browser color metadata. Baseline failure reproduced and regression now passes. |
| Medium | Hero/about statistics disagreed with the displayed data; CGPA was stale; credential badges implied independent verification. | Shared CGPA 3.42; derived counts of 12 projects including the personal project and six listed credentials. Badges say Completed, and courses are distinguished from professional certification. |
| Medium | RAG description overstated evaluation, and a hosted demo had no link. | Added the repository's demo URL; distinguished exploratory retrieval observations from a formal quality benchmark. [Research Agent source](https://github.com/abdulla-cc/research-agent-rag). |
| Medium | YouTube sentiment claims generalized a selected sample and implied permanent availability. | Qualified sampling and model limitations; changed the dashboard link to indicate it may sleep. Browser inspection reached Streamlit's sleeping-app page. |
| Medium | Job Application System page advertised six tables and routines absent from its export. Its trigger used table names with incorrect case and a root-specific definer. | Page now documents five tables, one trigger, and missing pieces; added the existing report link. Trigger names match lowercase schema, root definer removed, nullable status changes use null-safe comparison. |
| Medium | No browser regression suite or PR build gate existed. | Added Playwright and axe checks; pull requests now build and test. Only a passing main-branch workflow deploys, with deployment permissions scoped to that job. |
| Low | An illustration was labeled as a demo; small heading-level gaps and keyboard focus visibility reduced usability. | Illustration now labeled explicitly; heading hierarchy and focus styles corrected. Added canonical URL and a CV/email fallback when JavaScript is disabled. |

## Validation

- Production TypeScript/Vite build passed.
- 26 Chromium browser tests passed against the production build at the actual GitHub Pages base path.
- No serious or critical axe findings in the tested main-page dark/light states, the open case-study dialog, or the standalone database page.
- All 12 case-study buttons opened their corresponding content. Internal anchors and shipped image/CV/SQL/report assets resolved.
- Contact success, provider rejection, HTTP error, invalid JSON, network failure, timeout, whitespace input and duplicate-submission prevention were checked. **All requests were intercepted; no real email was sent.**
- Desktop dark/light and narrow-screen screenshots were inspected. This is Chromium coverage, not a Safari/Firefox or physical-device certification.
- Nine linked GitHub project repositories and the JobTracker frontend returned HTTP 200. The RAG demo loaded in a browser after an initial request timeout. Streamlit displayed a sleeping-app notice. Colab returned its app shell; this does not verify notebook permissions, execution, data access, or results.
- SQL received source-level checks only. A running MySQL/MariaDB server was unavailable; the installed Docker client could not connect to its daemon. Import/trigger behavior must still be exercised on a database server.

## Evidence still needed from the owner

1. **Graduation date:** the repository says March 2027; an earlier message said March 2026. The existing website date was preserved pending confirmation. Check the downloadable CV against the confirmed date and CGPA too; its contents were not rewritten.
2. **Certificate verification:** add issuer verification URLs or public certificate artifacts. Completed reflects the supplied portfolio data, not an independent credential check. Introductory Cisco coursework does not establish passing the CCNA exam.
3. **Diabetes reproducibility:** publish executable notebooks with accessible data, environment versions, fold-safe preprocessing, an untouched test set, metric definitions, positive-class support, and a baseline. Do not restore the removed performance graphic until its numbers are supported.
4. **RAG evaluation:** publish a small versioned question set, retrieval/grounding measures, expected answers, and failure examples. A critic model is not proof that answers are correct.
5. **SCOMS:** publish implementation and held-out baseline comparisons as they become available. Literature results are not measurements of this project's model. Keep its in-progress status accurate.
6. **Student database:** publish its actual schema, sample data, and reproducible queries. The separate Job Application System download is a different project and must not be linked as its source.
7. **Contact delivery:** complete FormSubmit's activation process and verify a real message reaches the intended inbox. API acceptance alone is not delivery. Direct email links remain available.
8. **Demo reliability:** keep sleeping/waking behavior explicit. Verify the YouTube refresh workflow separately from the Streamlit app's availability, and consider a short recorded walkthrough as a fallback.

The next improvement for recruiting is deeper evidence for two or three flagship projects, rather than more project cards. Show a reproducible setup, design tradeoffs, a failure you fixed, and an evaluation someone else can rerun. This audit does not independently certify the security or ML validity of every linked repository.
