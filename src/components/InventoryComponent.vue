<template>
    <nav class="inventory-nav">
        <router-link :to="{ name: 'shop' }"
            ><button>Volver a la Tienda</button></router-link
        >
    </nav>
    <div class="main-container">
        <img src="../assets/icons/backpack.png" alt="mochila" />
        <div class="inventory-container">
            <ul class="item-list">
                <li v-for="item in items" :key="item.id" class="item">
                    <div class="item-info">
                        <p class="item-name">
                            {{ item.param1 }}: {{ item.param6 || "Sin apodo" }}
                        </p>
                        <div class="item-btn">
                            <button @click="openNicknameModal(item)">
                                Asignar apodo
                            </button>
                            <button @click="openDiscardModal(item)">
                                Descartar
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <CustomModal
        :isVisible="isNicknameModalVisible"
        message="Ingresa el apodo:"
        confirmText="Asignar"
        cancelText="Cancelar"
        showInput
        @confirm="assignNickname"
        @cancel="closeNicknameModal"
    />

    <CustomModal
        :isVisible="isDiscardModalVisible"
        message="¿Estás seguro de descartar este objeto?"
        confirmText="Descartar"
        cancelText="Cancelar"
        @confirm="discardItem"
        @cancel="closeDiscardModal"
    />
</template>

<script>
import apiClient from "../services/apiService";
import CustomModal from "./CustomModal.vue";

export default {
    components: { CustomModal },
    data() {
        return {
            items: [],
            isNicknameModalVisible: false,
            isDiscardModalVisible: false,
            selectedItem: null,
            nickname: ""
        };
    },
    methods: {
        async getItems() {
            this.items = await apiClient.getAllInventoryItems();
        },
        openNicknameModal(item) {
            this.selectedItem = item;
            this.nickname = "";
            this.isNicknameModalVisible = true;
        },
        closeNicknameModal() {
            this.isNicknameModalVisible = false;
            this.selectedItem = null;
            this.nickname = "";
        },
        async assignNickname(nickname) {
            if (this.selectedItem && nickname) {
                try {
                    this.selectedItem.param6 = nickname;
                    await apiClient.setNickname(this.selectedItem);
                    this.closeNicknameModal();
                    await this.getItems();
                } catch (error) {
                    console.error("Error al asignar apodo:", error);
                }
            }
        },
        openDiscardModal(item) {
            this.selectedItem = item;
            this.isDiscardModalVisible = true;
        },
        closeDiscardModal() {
            this.isDiscardModalVisible = false;
            this.selectedItem = null;
        },
        async discardItem() {
            if (this.selectedItem) {
                try {
                    await apiClient.deleteInventoryItem(this.selectedItem);
                    this.closeDiscardModal();
                    await this.getItems();
                } catch (error) {
                    console.error("Error al descartar el objeto:", error);
                }
            }
        }
    },
    created() {
        this.getItems();
    }
};
</script>

<style scoped>

.inventory-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
}

.main-container img {
    height: 350px;
}

.inventory-container {
    display: flex;
    flex-direction: r;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: rgb(3, 153, 158);
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 465px;
}

.item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    list-style-type: none;
    margin: 0;
}

.item {
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    font-weight: bold;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 5px;
    text-align: center;
}

.item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item-name {
    font-size: 14px;
    margin: 0;
}

.item-btn {
    margin-top: 10px;
    display: flex;
    gap: 5px;
    flex-direction: column;
}

.item-btn button {
    background-color: turquoise;
    color: black;
}

.modal {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
}

.modal-content input {
    margin-bottom: 10px;
    padding: 8px;
    display: flex;
    justify-self: center;
    width: 250px;
}

.modal-content button {
    margin: 5px;
}
</style>
