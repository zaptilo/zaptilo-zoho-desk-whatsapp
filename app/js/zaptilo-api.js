/**
 * Zaptilo API Client for Zoho CRM Widget
 * Handles all communication with Zaptilo WhatsApp API
 */
const ZaptiloAPI = {
  baseUrl: 'https://zaptilo.ai',
  token: null,

  /**
   * Initialize with API token from Zoho org variables
   */
  async init() {
    try {
      const data = await ZOHO.CRM.API.getOrgVariable('zaptilo_api_token');
      this.token = data?.Success?.Content || '';
      return !!this.token;
    } catch (e) {
      console.error('Failed to load API token:', e);
      return false;
    }
  },

  /**
   * Make authenticated request to Zaptilo API
   */
  async request(method, endpoint, body = null) {
    if (!this.token) throw new Error('API token not configured');

    const opts = {
      method,
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
      },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(this.baseUrl + endpoint, opts);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  },

  /**
   * Send a text message
   */
  async sendMessage(number, message) {
    return this.request('POST', '/api/send', { number, message });
  },

  /**
   * Send a media message
   */
  async sendMedia(number, mediaUrl, mediaType, caption = '') {
    return this.request('POST', '/api/send/media', {
      number,
      media_url: mediaUrl,
      media_type: mediaType,
      caption,
    });
  },

  /**
   * Send a template message
   */
  async sendTemplate(number, templateName, language, headerValues = [], bodyValues = []) {
    const payload = { number, template_name: templateName, language };
    if (headerValues.length) payload.header_values = headerValues;
    if (bodyValues.length) payload.body_values = bodyValues;
    return this.request('POST', '/api/send/template', payload);
  },

  /**
   * List available templates
   */
  async getTemplates() {
    return this.request('GET', '/api/templates');
  },

  /**
   * Verify API connection
   */
  async verify() {
    return this.request('GET', '/api/verify');
  },
};

/**
 * Zoho CRM Helper utilities
 */
const ZohoHelper = {
  /**
   * Get current record data
   */
  async getCurrentRecord() {
    const entity = await ZOHO.CRM.UI.Functions.getEntity();
    const record = await ZOHO.CRM.API.getRecord({
      Entity: entity.Entity,
      RecordID: entity.EntityId,
    });
    return record?.data?.[0] || null;
  },

  /**
   * Get phone number from record (tries multiple fields)
   */
  getPhoneFromRecord(record) {
    return record.Mobile || record.Phone || record.Other_Phone || '';
  },

  /**
   * Get display name from record
   */
  getNameFromRecord(record) {
    if (record.Full_Name) return record.Full_Name;
    const parts = [record.First_Name, record.Last_Name].filter(Boolean);
    return parts.join(' ') || record.Company || 'Unknown';
  },

  /**
   * Log activity in Zoho CRM
   */
  async logActivity(entityType, entityId, subject, description) {
    try {
      await ZOHO.CRM.API.insertRecord({
        Entity: 'Tasks',
        APIData: [{
          Subject: subject,
          Description: description,
          What_Id: entityId,
          se_module: entityType,
          Status: 'Completed',
          Priority: 'Low',
        }],
      });
    } catch (e) {
      console.warn('Failed to log activity:', e);
    }
  },

  /**
   * Store message in Zoho CRM notes for history
   */
  async storeMessageNote(entityType, entityId, direction, message) {
    try {
      const prefix = direction === 'outgoing' ? '[WhatsApp Sent]' : '[WhatsApp Received]';
      await ZOHO.CRM.API.addNotes({
        Entity: entityType,
        RecordID: entityId,
        Title: prefix + ' ' + new Date().toLocaleString(),
        Content: message,
      });
    } catch (e) {
      console.warn('Failed to store message note:', e);
    }
  },

  /**
   * Get notes (message history) for a record
   */
  async getMessageHistory(entityType, entityId) {
    try {
      const notes = await ZOHO.CRM.API.getRelatedRecords({
        Entity: entityType,
        RecordID: entityId,
        RelatedList: 'Notes',
        page: 1,
        per_page: 50,
      });
      // Filter only WhatsApp notes
      return (notes?.data || []).filter(n =>
        n.Note_Title && n.Note_Title.startsWith('[WhatsApp')
      );
    } catch (e) {
      return [];
    }
  },

  /**
   * Show success notification
   */
  showSuccess(message) {
    const el = document.getElementById('alert-container');
    if (el) {
      el.innerHTML = `<div class="alert alert-success">${message}</div>`;
      setTimeout(() => { el.innerHTML = ''; }, 4000);
    }
  },

  /**
   * Show error notification
   */
  showError(message) {
    const el = document.getElementById('alert-container');
    if (el) {
      el.innerHTML = `<div class="alert alert-error">${message}</div>`;
      setTimeout(() => { el.innerHTML = ''; }, 5000);
    }
  },
};
