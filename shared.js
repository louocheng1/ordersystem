/**
 * 羅家新營豆菜麵 - 共享數據與邏輯 (v2 - Sequential IDs)
 */
console.log('SharedStore v2 loaded');

const MENU_ITEMS = [
    // 主食類
    { id: 'noodle_lg', name: '新營豆菜麵 (大)', price: 45, category: '主食類', emoji: '🍜' },
    { id: 'noodle_sm', name: '新營豆菜麵 (小)', price: 35, category: '主食類', emoji: '🍜' },
    { id: 'vermicelli_lg', name: '炒米粉 (大)', price: 45, category: '主食類', emoji: '🍝' },
    { id: 'vermicelli_sm', name: '炒米粉 (小)', price: 35, category: '主食類', emoji: '🍝' },
    { id: 'braised_pork_lg', name: '爌肉飯 (大)', price: 55, category: '主食類', emoji: '🍱' },
    { id: 'braised_pork_sm', name: '爌肉飯 (小)', price: 50, category: '主食類', emoji: '🍱' },
    { id: 'minced_pork_lg', name: '肉燥飯 (大)', price: 45, category: '主食類', emoji: '🍛' },
    { id: 'minced_pork_sm', name: '肉燥飯 (小)', price: 35, category: '主食類', emoji: '🍛' },
    { id: 'chicken_rice_lg', name: '雞肉飯 (大)', price: 45, category: '主食類', emoji: '🍚' },
    { id: 'chicken_rice_sm', name: '雞肉飯 (小)', price: 35, category: '主食類', emoji: '🍚' },
    { id: 'white_rice_lg', name: '白飯 (大)', price: 15, category: '主食類', emoji: '🍚' },
    { id: 'white_rice_sm', name: '白飯 (小)', price: 10, category: '主食類', emoji: '🍚' },
    
    // 小菜類
    { id: 'milkfish_belly', name: '滷虱目魚肚', price: 110, category: '小菜類', emoji: '🐟' },
    { id: 'tilapia', name: '滷吳郭魚', price: 50, category: '小菜類', emoji: '🐟' },
    { id: 'milkfish_head', name: '滷虱目魚頭', price: 15, category: '小菜類', emoji: '🐟' },
    { id: 'bamboo_lg', name: '筍乾 (大)', price: 50, category: '小菜類', emoji: '🎋' },
    { id: 'bamboo_sm', name: '筍乾 (小)', price: 30, category: '小菜類', emoji: '🎋' },
    { id: 'cabbage_lg', name: '滷白菜 (大)', price: 50, category: '小菜類', emoji: '🥬' },
    { id: 'cabbage_sm', name: '滷白菜 (小)', price: 30, category: '小菜類', emoji: '🥬' },
    { id: 'meatball', name: '滷貢丸', price: 10, category: '小菜類', emoji: '🧆' },
    { id: 'egg', name: '滷蛋', price: 15, category: '小菜類', emoji: '🥚' },
    { id: 'tofu', name: '油豆腐', price: 10, category: '小菜類', emoji: '🥢' },
    { id: 'wheel', name: '車輪', price: 10, category: '小菜類', emoji: '🍥' },

    // 湯類
    { id: 'lg_intestine_blood', name: '大腸豬血湯', price: 70, category: '湯類', emoji: '🥣' },
    { id: 'pig_blood', name: '清豬血湯', price: 35, category: '湯類', emoji: '🥣' },
    { id: 'intestine_soup', name: '腸子湯', price: 70, category: '湯類', emoji: '🥣' },
    { id: 'sm_intestine_blood', name: '小肚豬血湯', price: 70, category: '湯類', emoji: '🥣' },
    { id: 'fish_belly_soup', name: '虱目魚肚湯', price: 110, category: '湯類', emoji: '🐟' },
    { id: 'fish_belly_congee', name: '虱目魚肚粥', price: 120, category: '湯類', emoji: '🥣' },
    { id: 'fish_skin_soup', name: '虱目魚皮湯', price: 60, category: '湯類', emoji: '🐟' },
    { id: 'fish_skin_congee', name: '虱目魚皮粥', price: 70, category: '湯類', emoji: '🥣' },
    { id: 'fish_meat_soup', name: '虱目魚肉湯', price: 60, category: '湯類', emoji: '🐟' },
    { id: 'fish_meat_congee', name: '虱目魚肉粥', price: 70, category: '湯類', emoji: '🥣' },
    { id: 'seafood_congee', name: '海產粥', price: 80, category: '湯類', emoji: '🥣' },
    { id: 'clam_soup', name: '蛤仔湯', price: 50, category: '湯類', emoji: '🐚' },
    { id: 'oyster_soup', name: '蚵仔湯', price: 70, category: '湯類', emoji: '🐚' },
    { id: 'melon_pork_soup', name: '苦瓜排骨湯', price: 50, category: '湯類', emoji: '🥣' },
    { id: 'egg_flower_soup', name: '蛋花湯', price: 30, category: '湯類', emoji: '🥣' },
    { id: 'fishball_soup', name: '魚丸湯', price: 30, category: '湯類', emoji: '🥣' },
    { id: 'meatball_soup', name: '貢丸湯', price: 30, category: '湯類', emoji: '🥣' }
];

const STORAGE_KEY = 'luo_orders_shared';

const COUNTER_KEY = 'luo_counters_shared';

const SharedStore = {
    getOrders() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },
    getNextId(type) {
        const data = localStorage.getItem(COUNTER_KEY);
        let counters = data ? JSON.parse(data) : { 'dine-in': 0, 'take-out': 0 };
        counters[type] = (counters[type] || 0) + 1;
        localStorage.setItem(COUNTER_KEY, JSON.stringify(counters));
        
        const prefix = type === 'dine-in' ? '內' : '外';
        return `${prefix}${counters[type]}`;
    },
    saveOrder(order) {
        const orders = this.getOrders();
        orders.unshift(order);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        window.dispatchEvent(new Event('storage'));
    },
    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        }
    },
    clearAll() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(COUNTER_KEY);
        window.dispatchEvent(new Event('storage'));
    }
};

function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
