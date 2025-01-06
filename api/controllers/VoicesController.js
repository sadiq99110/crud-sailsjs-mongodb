module.exports = {
  createWithProjects: async (req, res) => {
    try {
      console.log("Request", req.body);
      
      // Extract fields from the request
      const { author_name, author_desc, author_title } = req.body;

      // Upload author image
      const author_image = await FileService.uploadAndGetPath(
        req.file('author_image'),
        'uploads/2025/voices/images'
      );

      console.log("author_image", author_image);

      // Create Voice entry
      const voice = await sails.models.voices.create({
        author_name,
        author_desc,
        author_title,
        author_image,
      }).fetch();

      console.log("voice", voice);
      
      // Initialize the projects array
      const projects = [];
      let i = 0;

      // Collect project data
      while (req.body[`projects[${i}][project_name]`] && req.body[`projects[${i}][project_desc]`]) {
        projects.push({
          project_name: req.body[`projects[${i}][project_name]`],
          project_desc: req.body[`projects[${i}][project_desc]`],
        });
        i++;
      }

      console.log("projects", projects);

      // Handle projects array
      for (const project of projects) {
        console.log("project", project, "voice", voice)
        // if (project.project_image) {
        //   const projectImagePath = await FileService.uploadAndGetPath(
        //     req.file(`projects[${projects.indexOf(project)}][project_image]`),
        //     'uploads/2025/projects/images'
        //   );

          let data = await sails.models.projects.create({
            project_name: project.project_name,
            project_desc: project.project_desc,
            project_image: 'sss.jpg', // Use the actual image path here
            voice_id: voice.id,
          });

          console.log("DATAAAA", data)
        }
      // }

      return res.status(201).json({
        message: 'Voice and Projects created successfully',
        voice
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
};
