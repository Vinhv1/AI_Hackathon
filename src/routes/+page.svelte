<script lang="ts">
    import { onMount } from "svelte";
    import firebase from "firebase/app";
    import "firebase/firestore";
    import "firebase/storage";
    import { firebaseConfig } from "../firebaseConfig";
  
    let db: firebase.firestore.Firestore;
    let storage: firebase.storage.Storage;
    let data: Array<{ title: string; amount: number }> = [];
  
    onMount(async () => {
      // Initialize Firebase and set up Firestore subscriptions
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      storage = firebase.storage();
    });
  
    function handleFileUpload(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const { name, type } = file;
        // Perform any necessary validations on the file here
  
        // Create a storage reference
        const storageRef = storage.ref().child(name);
  
        // Upload the file to Firebase Storage
        const uploadTask = storageRef.put(file);
  
        // Listen for upload completion
        uploadTask.on(
          "state_changed",
          null,
          null,
          () => {
            // Get the download URL for the uploaded file
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
              // Perform any necessary operations with the downloadURL
              console.log("File uploaded:", downloadURL);
              // You can save the downloadURL to a database or perform further processing here
            });
          }
        );
      }
    }
  </script>
  
  <h1>Asian Fusion</h1>
  
  <!-- File upload form -->
  <form>
    <input type="file" accept=".pdf, .jpeg, .jpg, .png" on:change={handleFileUpload} />
  </form>
  
  <!-- Render invoice data -->
  <ul>
    {#each data as invoice}
      <li>{invoice.title} - ${invoice.amount}</li>
    {/each}
  </ul>
  