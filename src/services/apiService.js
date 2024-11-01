import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.yumserver.com/16464/generic'
});

export default {

    async getAllProducts() {
        try {
            const response = await apiClient.get('/productos');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async purchaseProduct(product) {
        try {
            await apiClient.post(`/inventario`, product);
        } catch (error) {
            console.error(error);
        }
    },
    async getAllInventoryItems() {
        try {
            const response = await apiClient.get('/inventario');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteInventoryItem(item) {
        try {
            const itemId = item.idcod;
            await apiClient.request({
                url: '/inventario',
                method: 'DELETE',
                data: { idcod: itemId }
            });
        } catch (error) {
            console.error(error);
        }
    },
    async setNickname(item) {
        try {
            const updatedItem = {...item}
            await apiClient.patch('/inventario', updatedItem);
        } catch (error) {
            console.error("Error al asignar apodo:", error);
        }
    },
    async updateProduct(product) {
        try {
            await apiClient.patch('/productos', product.idcod)
        } catch (error) {
            console.error("Error aplicando descuento:", error);
        }
    }
}