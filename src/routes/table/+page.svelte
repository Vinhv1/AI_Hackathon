<script lang="ts">
    import { onMount } from "svelte";
    import firebase from "firebase/app";
    import "firebase/firestore";
  
    import { firebaseConfig } from "../../firebaseConfig";
  
    let db: firebase.firestore.Firestore;
    let data: Array<{ title: string; amount: number }> = [];
  
    onMount(() => {
      // Initialize Firebase
      if (!(firebase as any).apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
  
      // Get a reference to the Firestore database
      db = firebase.firestore();
  
      // Subscribe to a Firestore collection and update the 'data' array when changes occur
      db.collection("invoices").onSnapshot((querySnapshot: { docs: any[]; }) => {
        data = querySnapshot.docs.map((doc) => doc.data() as { title: string; amount: number });
      });
    });
  
    // Function to add a new invoice to the Firestore collection    
    function addInvoice() {
      db.collection("invoices").add({
        title: "New Invoice",
        amount: 100,
      });
    }
  </script>
  
  <h1>Invoices</h1>
  
  <button on:click={addInvoice}>Add Invoice</button>
  
  <ul>
    {#each data as invoice}
      <li>{invoice.title} - ${invoice.amount}</li>
    {/each}
  </ul>
  