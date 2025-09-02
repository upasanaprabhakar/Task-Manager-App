<h1 style="font-size:2.5rem; font-weight:bold; margin-bottom:1rem;">🚀 Task Master - Task Manager Application</h1>
<p style="font-size:1.15rem; margin-bottom:1.5rem;">
  A full-stack <strong>Task and Project Manager</strong> web application designed to help users 
  <strong>organize tasks and projects effortlessly</strong>. This app offers dynamic CRUD operations, advanced search &amp; filter, 
  and comprehensive status tracking with progress indicators.
</p>

<h2 style="font-size:2rem; margin-bottom:0.75rem;">✨ Features</h2>

<h3 style="font-size:1.5rem; margin-bottom:0.5rem;">📝 Task Management (Smaller Tasks)</h3>
<ul style="font-size:1.1rem; line-height:1.6; color:#333; margin-bottom:1.5rem; list-style-type: disc; padding-left:1.5rem;">
  <li><strong>Create, read, update, and delete</strong> individual tasks and action items.</li>
  <li>Track task <strong>status:</strong> Pending, Ongoing, and Completed.</li>
  <li>Set <strong>due dates</strong> for tasks.</li>
  <li>Visual <strong>progress bars</strong> and <strong>color-coded status badges</strong>.</li>
  <li><strong>Search tasks</strong> by title with <em>real-time filtering</em>.</li>
  <li><strong>Filter tasks</strong> by status.</li>
  <li><em>Designed for managing smaller, day-to-day to-dos and actionable items.</em></li>
</ul>

<h3 style="font-size:1.5rem; margin-bottom:0.5rem;">📁 Project Management (Larger Scope)</h3>
<ul style="font-size:1.1rem; line-height:1.6; color:#333; margin-bottom:1.5rem; list-style-type: disc; padding-left:1.5rem;">
  <li><strong>Create, read, update, and delete</strong> projects consisting of related tasks.</li>
  <li>Manage overall <strong>project status</strong> and due dates.</li>
  <li>Search and filter projects similarly to tasks.</li>
  <li>Visual <strong>progress bars</strong> and intuitive <strong>status indicators</strong>.</li>
  <li>Separate <strong>modal</strong> for adding and editing projects with dropdown status selector.</li>
  <li><em>Ideal for handling bigger, long-term initiatives composed of multiple smaller tasks.</em></li>
</ul>

<h3 style="font-size:1.5rem; margin-bottom:0.5rem;">🎨 User Experience</h3>
<ul style="font-size:1.1rem; line-height:1.6; color:#333; margin-bottom:1.5rem; list-style-type: disc; padding-left:1.5rem;">
  <li>Dynamic form <strong>modals</strong> for adding and editing tasks/projects.</li>
  <li>Responsive and modern <strong>UI with subtle animations</strong>.</li>
  <li>Confirmation prompts on <strong>delete actions</strong> using toast notifications.</li>
  <li>No-item <strong>placeholder images</strong> to enhance user feedback when task or project lists are empty.</li>
</ul>

<h3 style="font-size:1.5rem; margin-bottom:0.5rem;">⚙️ Technical Highlights</h3>
<ul style="font-size:1.1rem; line-height:1.6; color:#333; margin-bottom:1.5rem; list-style-type: disc; padding-left:1.5rem;">
  <li>React frontend with functional components and hooks.</li>
  <li>Express.js backend API server implementing RESTful CRUD with Mongoose and MongoDB.</li>
  <li>Environment variable configuration with dotenv.</li>
  <li>Fetch API integration for real-time backend communication.</li>
  <li>Custom dropdown UI components for status selection.</li>
  <li>Modular CSS with scoped styling per component.</li>
  <li>Toast notification system for user alerts and confirmations.</li>
</ul>

<h1 style="font-size:2rem; margin-bottom:0.75rem;">📌My Tasks</h1>
<img width="1917" height="868" alt="Screenshot 2025-09-01 221137" src="https://github.com/user-attachments/assets/310804ed-8787-432a-b274-f88496d82e73" />

<h1 style="font-size:2rem; margin-bottom:0.75rem;">📌Projects</h1>
<img width="1919" height="873" alt="Screenshot 2025-09-01 221610" src="https://github.com/user-attachments/assets/87f830c9-dcdc-49c2-b3dd-0818338c8358" />

<h1 style="font-size:2rem; margin-bottom:0.75rem;">📌Login/Register</h1>
<img width="1919" height="862" alt="Screenshot 2025-09-02 230539" src="https://github.com/user-attachments/assets/17c67004-5ee8-4533-9bb5-56d1be080a46" />


<h2 style="font-size:2rem; margin-bottom:0.75rem;">💻 Installation &amp; Setup</h2>
<ol style="font-size:1.1rem; line-height:1.6; color:#333; padding-left:1.5rem; margin-bottom:2rem;">
  <li>Open your terminal/command prompt.</li>
  <li>Clone the repository:
    <pre style="background:#f5f5f5; padding:0.5rem; border-radius:4px; max-width:fit-content;">git clone &lt;repository-url&gt;</pre>
  </li>
  <li>Navigate to the project folder:
    <pre style="background:#f5f5f5; padding:0.5rem; border-radius:4px; max-width:fit-content;">cd my-task-manager</pre>
  </li>
  <li>Setup and start the backend:
    <pre style="background:#f5f5f5; padding:0.5rem; border-radius:4px; max-width:fit-content;">
cd backend
npm install
create a .env file with your MongoDB URI
npm run dev
    </pre>
  </li>
  <li>Setup and start the frontend:
    <pre style="background:#f5f5f5; padding:0.5rem; border-radius:4px; max-width:fit-content;">
cd ../frontend
npm install
npm start
    </pre>
  </li>
  <li>Open the app in your browser at <code>http://localhost:3000</code>.</li>
  <li>Use the UI to add, edit, search, filter, and delete tasks and projects.</li>
  <li>Manage status and due dates, and view progress bars for quick updates.</li>
</ol>

<h2 style="font-size:2rem; margin-bottom:0.75rem;">🛠 Technologies Used</h2>
<ul style="font-size:1.1rem; line-height:1.6; color:#333; margin-bottom:1.5rem; list-style-type: disc; padding-left:1.5rem;">
  <li>React.js</li>
  <li>Express.js</li>
  <li>Node.js</li>
  <li>MongoDB &amp; Mongoose</li>
  <li>CSS Modules / Scoped CSS</li>
  <li>Toastify for notifications</li>
  <li>Lottie animations for UI flair</li>
</ul>

<h2 style="font-size:2rem; margin-bottom:0.75rem;">🤝 Contributing</h2>
<p style="font-size:1.15rem; margin-bottom:1.5rem;">
  Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit pull requests.
</p>

<h2 style="font-size:2rem; margin-bottom:0.75rem;">📄 License</h2>
<p style="font-size:1.15rem; margin-bottom:1.5rem;">
  This project is licensed under the MIT License.
</p>

<h2 style="font-size:2rem; margin-bottom:0.75rem;">📞 Contact</h2>
<p style="font-size:1.15rem;">
  For support or inquiries, please contact 
  <a href="mailto:upasanaprabhakar35@gmail.com" style="color:#007acc; text-decoration:none;">upasanaprabhakar35@gmail.com</a>
</p>
