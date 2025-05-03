async function createNotification(userId, data) {
    try {
        const notificationData = {
            ...data,
            createdAt: new Date().toISOString(),
            read: false
        };
        
        await trickleCreateObject(`notifications:${userId}`, notificationData);
    } catch (error) {
        console.error('Failed to create notification:', error);
        throw error;
    }
}

async function createJobPostingNotification(employerId, jobData) {
    const notification = {
        type: 'job_posted',
        title: 'New Job Posted',
        message: `You have successfully posted a new job: ${jobData.title}`,
        link: 'jobs',
        metadata: {
            jobId: jobData.id
        }
    };
    
    await createNotification(employerId, notification);
}

async function createJobApplicationNotification(jobData, candidateId, employerId) {
    // Notify employer
    const employerNotification = {
        type: 'job_application',
        title: 'New Job Application',
        message: `A new candidate has applied for ${jobData.title}`,
        link: `candidates?id=${candidateId}`,
        metadata: {
            jobId: jobData.id,
            candidateId: candidateId
        }
    };
    
    await createNotification(employerId, employerNotification);
    
    // Notify candidate
    const candidateNotification = {
        type: 'job_application',
        title: 'Application Submitted',
        message: `Your application for ${jobData.title} at ${jobData.company} has been submitted`,
        link: 'applications',
        metadata: {
            jobId: jobData.id
        }
    };
    
    await createNotification(candidateId, candidateNotification);
}

async function createProfileViewNotification(viewedUserId, viewerName) {
    const notification = {
        type: 'profile_view',
        title: 'Profile View',
        message: `${viewerName} viewed your profile`,
        link: null,
        metadata: {
            viewerId: viewedUserId
        }
    };
    
    await createNotification(viewedUserId, notification);
}

async function createMessageNotification(recipientId, senderName) {
    const notification = {
        type: 'message',
        title: 'New Message',
        message: `You have a new message from ${senderName}`,
        link: 'messages',
        metadata: {
            senderId: recipientId
        }
    };
    
    await createNotification(recipientId, notification);
}

async function createApplicationStatusNotification(candidateId, jobData, status) {
    const notification = {
        type: 'application_status',
        title: 'Application Status Update',
        message: `Your application for ${jobData.title} at ${jobData.company} has been ${status}`,
        link: 'applications',
        metadata: {
            jobId: jobData.id,
            status: status
        }
    };
    
    await createNotification(candidateId, notification);
}
