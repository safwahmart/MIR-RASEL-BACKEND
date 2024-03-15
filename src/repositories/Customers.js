
import SuperFetch from 'api/SuperFetch';
import querparser from 'query-string';

class Customers {
  getAll(query = { limit: 10, page: 1, sort: 'id', order: 'desc' }) {
    return SuperFetch(`users?${querparser.stringify(query)}`);
  }

  getDetails(id) {
    return SuperFetch(`users/${id}/information`);
  }

  getSingle(id) {
    return SuperFetch(`users/${id}`);
  }

  getAssociatAccount(id) {
    return SuperFetch(`users/${id}/associate-accounts`);
  }

  block(id, body) {
    console.log("body",body)
    return SuperFetch(`users/${id}/status`, { method: 'PUT', data: body });
  }

  unblock(id) {
    return SuperFetch(`users/${id}/status`, { method: 'PUT' });
  }

  customerCommunicationWarning(aId, cId, actionType, msg = 'Contact With Him/Her', status = 0) {
    return SuperFetch(
      `hats/communications?customer_id=${cId}&message=${msg}&status=${status}&action_type=${actionType}&action_id=${aId}`,
      { method: 'POST' },
    );
  }

  customerCommunicationList(query) {
    return SuperFetch(`hats/communications?limit=${query.limit}&page=${query.page}`);
  }

  customerCommunicationStatus(id, status) {
    return SuperFetch(`hats/communications/${id}/status?status=${status}`, { method: 'POST' });
  }
}

export default new Customers();
