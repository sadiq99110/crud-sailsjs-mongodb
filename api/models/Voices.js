/**
 * Voices.js
 */
module.exports = {
    identity: 'voices',
    attributes: {
      author_name: { type: 'string', required: true },
      author_desc: { type: 'string' },
      author_title: { type: 'string' },
      author_image: { type: 'string' }, // Will store file path
      // author_promo_video: { type: 'string' }, // Will store file path
  
      // Relationship
      projects: {
        collection: 'projects',
        via: 'voice_id'
      }
    }
  };
  