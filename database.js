import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
      import {
        getFirestore,
        doc,
        getDoc,
        getDocs,
        setDoc,
        collection,
      } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

      // Firebase Configuration
      const firebaseConfig = {
        apiKey: "AIzaSyAW9QYxE_Us4PpEBknNHpXxf1tHncjvwRE",
        authDomain: "kulibin-180.firebaseapp.com",
        projectId: "kulibin-180",
        storageBucket: "kulibin-180.firebasestorage.app",
        messagingSenderId: "202904655192",
        appId: "1:202904655192:web:6d2480eb50403cd88dc12d",
        measurementId: "G-169NDCLNMY",
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const dropbox = document.getElementById("dropbox");

      // Drag and Drop Event Handlers
      dropbox.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropbox.style.borderColor = "#666";
      });

      dropbox.addEventListener("dragleave", () => {
        dropbox.style.borderColor = "#aaa";
      });

      dropbox.addEventListener("drop", async (e) => {
        e.preventDefault();
        dropbox.style.borderColor = "#aaa";

        const file = e.dataTransfer.files[0];
        if (!file) return alert("No file detected");

        const reader = new FileReader();
        reader.onload = async function (event) {
          const base64Data = event.target.result.split(",")[1]; // убираем префикс "data:...;base64,"
          const fileId = file.name;

          try {
            await setDoc(doc(db, "files", fileId), {
              name: file.name,
              size: file.size,
              type: file.type,
              base64: base64Data,
              uploadedAt: new Date(),
            });
            dropbox.innerText = `Uploaded to Firestore: ${file.name}`;
            console.log("Base64 saved for:", file.name);
          } catch (err) {
            console.error("Error saving file:", err);
            dropbox.innerText = "Upload failed";
          }
        };

        reader.readAsDataURL(file); // Читаем как base64
      });
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async function downloadFile() {
        const fileId = "uwu (1).png"; // Use the real file name here
        const fileData = await fetchFileData(fileId);

        if (fileData) {
          const { base64, fileName, mimeType } = fileData;

          // Decode base64 to byte array
          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: mimeType });

          // Create a download link
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName;

          // Trigger download
          link.click();
          URL.revokeObjectURL(link.href); // Free up memory
        } else {
          console.log("File data is not available.");
        }
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async function fetchFileData(fileId) {
        const docRef = doc(db, "files", fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fileData = docSnap.data();
          return {
            base64: fileData.base64,
            fileName: fileData.name,
            mimeType: fileData.type,
          };
        } else {
          console.log("No such document!");
          return null;
        }
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async function getFilesCount() {
        const querySnapshot = await getDocs(collection(db, "files"));
        const count = querySnapshot.size; // .size возвращает количество документов
        console.log(`Количество файлов в базе данных: ${count}`);
        return count;
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      document
        .getElementById("downloadButton")
        .addEventListener("click", downloadFile);
      getFilesCount();