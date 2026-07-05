<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/api";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  badge: string;
  available: boolean;
};

type Product = ProductForm & {
  id: number;
};

const products = ref<Product[]>([]);
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const editingId = ref<number | null>(null);

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: "",
  badge: "",
  available: true,
};

const form = ref<ProductForm>({ ...emptyForm });

async function loadProducts(): Promise<void> {
  loading.value = true;
  errorMessage.value = "";

  try {
    products.value = await getProducts();
  } catch (error) {
    console.error(error);
    errorMessage.value = "Produkte konnten nicht geladen werden.";
  } finally {
    loading.value = false;
  }
}

function resetForm(): void {
  form.value = { ...emptyForm };
  editingId.value = null;
}

function editProduct(product: Product): void {
  editingId.value = product.id;
  form.value = {
    name: product.name ?? "",
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    category: product.category ?? "",
    imageUrl: product.imageUrl ?? "",
    badge: product.badge ?? "",
    available: product.available ?? true,
  };
}

async function saveProduct(): Promise<void> {
  errorMessage.value = "";
  successMessage.value = "";

  if (!form.value.name.trim()) {
    errorMessage.value = "Bitte gib einen Produktnamen ein.";
    return;
  }

  if (Number(form.value.price) < 0) {
    errorMessage.value = "Der Preis darf nicht negativ sein.";
    return;
  }

  const payload: ProductForm = {
    ...form.value,
    price: Number(form.value.price),
  };

  try {
    if (editingId.value === null) {
      await createProduct(payload);
      successMessage.value = "Produkt wurde gespeichert.";
    } else {
      await updateProduct(editingId.value, payload);
      successMessage.value = "Produkt wurde aktualisiert.";
    }

    resetForm();
    await loadProducts();
  } catch (error) {
    console.error(error);
    errorMessage.value = "Speichern fehlgeschlagen. Prüfe Backend, Render-URL und Datenbank.";
  }
}

async function removeProduct(product: Product): Promise<void> {
  const shouldDelete = window.confirm(`Produkt wirklich löschen: ${product.name}?`);
  if (!shouldDelete) return;

  errorMessage.value = "";
  successMessage.value = "";

  try {
    await deleteProduct(product.id);
    successMessage.value = "Produkt wurde gelöscht.";
    await loadProducts();
  } catch (error) {
    console.error(error);
    errorMessage.value = "Löschen fehlgeschlagen.";
  }
}
async function toggleAvailability(product: Product): Promise<void> {
  errorMessage.value = "";
  successMessage.value = "";

  const updatedProduct: ProductForm = {
    name: product.name ?? "",
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    category: product.category ?? "",
    imageUrl: product.imageUrl ?? "",
    badge: product.badge ?? "",
    available: !product.available,
  };

  try {
    await updateProduct(product.id, updatedProduct);

    successMessage.value = updatedProduct.available
        ? "Produkt wurde aktiviert."
        : "Produkt wurde deaktiviert.";

    await loadProducts();
  } catch (error) {
    console.error(error);
    errorMessage.value = "Verfügbarkeit konnte nicht geändert werden.";
  }
}

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <section class="admin-page">
    <div class="admin-panel">
      <header class="admin-header">
        <span class="eyebrow">ATLAS STORE ADMIN</span>
        <h1>Produkte verwalten</h1>
        <p>
          Hier testet dein Frontend die REST-Schnittstelle des Backends:
          GET, POST, PUT und DELETE für Produkte.
        </p>
      </header>

      <form class="product-form" @submit.prevent="saveProduct">
        <h2>{{ editingId === null ? "Produkt hinzufügen" : "Produkt bearbeiten" }}</h2>

        <label>
          Name
          <input v-model="form.name" type="text" placeholder="z. B. Hoodie Schwarz" />
        </label>

        <label>
          Beschreibung
          <textarea v-model="form.description" placeholder="Kurze Produktbeschreibung"></textarea>
        </label>

        <div class="form-row">
          <label>
            Preis
            <input v-model.number="form.price" type="number" min="0" step="0.01" />
          </label>

          <label>
            Kategorie
            <input v-model="form.category" type="text" placeholder="z. B. Autozubehör" />
          </label>
        </div>

        <div class="form-row">
          <label>
            Bild-URL
            <input v-model="form.imageUrl" type="text" placeholder="https://... oder /src/assets/..." />
          </label>

          <label>
            Badge
            <input v-model="form.badge" type="text" placeholder="Neu, Top, -20%" />
          </label>
        </div>

        <label class="checkbox-label">
          <input v-model="form.available" type="checkbox" />
          Produkt ist verfügbar
        </label>

        <div class="form-actions">
          <button type="submit" class="primary-btn">
            {{ editingId === null ? "Hinzufügen" : "Änderungen speichern" }}
          </button>

          <button v-if="editingId !== null" type="button" class="secondary-btn" @click="resetForm">
            Abbrechen
          </button>
        </div>
      </form>

      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="message success">{{ successMessage }}</p>

      <section class="product-list">
        <div class="list-header">
          <h2>Produkte aus der Datenbank</h2>
          <button type="button" class="secondary-btn" @click="loadProducts">Neu laden</button>
        </div>

        <p v-if="loading">Lade Produkte...</p>

        <div v-else-if="products.length === 0" class="empty-state">
          Noch keine Produkte in der Datenbank. Füge oben ein Produkt hinzu.
        </div>

        <table v-else>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Kategorie</th>
            <th>Preis</th>
            <th>Verfügbar</th>
            <th>Aktionen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ Number(product.price).toFixed(2) }} €</td>
            <td>{{ product.available ? "Ja" : "Nein" }}</td>
            <td class="actions-cell">
              <button type="button" class="secondary-btn" @click="editProduct(product)">
                Bearbeiten
              </button>

              <button type="button" class="secondary-btn" @click="toggleAvailability(product)">
                {{ product.available ? "Deaktivieren" : "Aktivieren" }}
              </button>

              <button type="button" class="danger-btn" @click="removeProduct(product)">
                Löschen
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 32px 22px 80px;
  background: #f4f6f8;
}

.admin-panel {
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}

.admin-header {
  margin-bottom: 26px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #082949;
}

.admin-header h1,
.product-form h2,
.product-list h2 {
  margin: 0 0 10px;
  color: #082949;
}

.admin-header p {
  max-width: 760px;
  color: #4a5568;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px;
  border: 1px solid #dde3ea;
  border-radius: 16px;
  background: #fafafa;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 700;
  color: #1f2937;
}

input,
textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  font: inherit;
}

textarea {
  min-height: 90px;
  resize: vertical;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
  font-weight: 600;
}

.checkbox-label input {
  width: auto;
}

.form-actions,
.list-header,
.actions-cell {
  display: flex;
  gap: 10px;
  align-items: center;
}

.list-header {
  justify-content: space-between;
  margin: 28px 0 12px;
}

.primary-btn,
.secondary-btn,
.danger-btn {
  border: none;
  border-radius: 999px;
  padding: 9px 14px;
  font-weight: 800;
  cursor: pointer;
}

.primary-btn {
  color: #ffffff;
  background: #082949;
}

.secondary-btn {
  color: #082949;
  background: #e6edf5;
}

.danger-btn {
  color: #ffffff;
  background: #b91c1c;
}

.message {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 700;
}

.error {
  color: #7f1d1d;
  background: #fee2e2;
}

.success {
  color: #14532d;
  background: #dcfce7;
}

.empty-state {
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
  color: #475569;
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;
  font-weight: 700;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

th {
  color: #082949;

}

.product-list tbody td {
  color: #082949 !important;
  opacity: 1 !important;
  font-weight: 600;
}

.product-list tbody tr {
  background-color: #ffffff;
}

.product-list thead th {
  color: #082949;
}


@media (max-width: 780px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  table,
  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 14px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }


}
</style>
