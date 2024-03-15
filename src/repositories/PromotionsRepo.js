import SuperFetch, { SuperUploader } from 'api/SuperFetch';
import querparser from 'query-string';

class PromotionsRepo {
    getAll(query = { limit: 10, page: 1, sort: 'id', order: 'desc' }) {
        return SuperFetch(`promotions?${querparser.stringify(query)}`);
    }

    getSingle(id) {
        return SuperFetch(`promotions/${id}`);
    }
    createPromotions(query, formData) {
        console.log('query', query, formData);
        return SuperFetch(`promotions?${querparser.stringify(query)}`, {
            data: formData,
            method: 'POST'
        });
    }
    updatePromotions(id, query, formData) {
        return SuperFetch(`promotions/${id}?${querparser.stringify(query)}`, {
            data: formData,
            method: 'POST'
        });
    }

    deletePromotions(id) {
        return SuperFetch(`promotions/${id}`, {
            method: 'DELETE'
        });
    }
    pushPromotions(id) {
        return SuperFetch(`promotions/${id}/push`, {
            method: 'POST'
        });
    }
}

export default new PromotionsRepo();
