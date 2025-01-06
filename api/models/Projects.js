/**
 * Projects.js
 */
module.exports = {
    identity: 'projects',
    attributes: {
      project_name: { type: 'string', required: true },
      project_desc: { type: 'string' },
      project_image: { type: 'string' }, // Will store file path
  
      // Foreign key reference
      voice_id: {
        model: 'voices',
        required: true
      }
    }
  };
  