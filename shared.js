/**
 * 羅家新營豆菜麵 - 共享數據與邏輯 (v3 - Supabase Cloud)
 */
console.log('SharedStore v3 (Supabase) loaded');

// Supabase 配置
const SUPABASE_URL = 'https://wtkqmgihyxklrbeblbws.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xDnzR8_Iz6DH_U5qjYnLdA_oOOpKWKB'; // 注意：若連線失敗，請檢查此金鑰是否為 anon public key

let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
    console.error('Supabase 初始化失敗，請檢查 SDK 是否正確載入', e);
}

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

const SharedStore = {
    async getOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('讀取訂單失敗:', error);
            return [];
        }
        return data;
    },

    async getNextId(type) {
        // 先獲取目前的計數器數值
        const { data, error } = await supabase
            .from('counters')
            .select('count')
            .eq('type', type)
            .single();

        if (error) {
            console.error('獲取序號失敗:', error);
            return 'Error';
        }

        const nextCount = data.count + 1;

        // 更新資料庫中的計數器
        await supabase
            .from('counters')
            .update({ count: nextCount })
            .eq('type', type);

        const prefix = type === 'dine-in' ? '內' : '外';
        return `${prefix}${nextCount}`;
    },

    async saveOrder(order) {
        const { error } = await supabase
            .from('orders')
            .insert([order]);
        
        if (error) {
            console.error('儲存訂單失敗:', error);
            throw error;
        }
    },

    async updateOrderStatus(orderId, status) {
        const { error } = await supabase
            .from('orders')
            .update({ status: status })
            .eq('id', orderId);
        
        if (error) {
            console.error('更新訂單狀態失敗:', error);
            throw error;
        }
    },

    async clearAll() {
        // 清除所有訂單紀錄
        const { error: orderError } = await supabase
            .from('orders')
            .delete()
            .neq('id', 'placeholder_force_all'); // 刪除所有資料

        // 重置計數器
        const { error: counterError } = await supabase
            .from('counters')
            .update({ count: 0 })
            .neq('type', 'placeholder');

        if (orderError || counterError) {
            console.error('清除資料時發生錯誤', orderError, counterError);
        }
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
