const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

const generatePDF = (places, userPreferences) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const bufferStream = new PassThrough();
        const buffers = [];

        // Capture PDF data into buffers
        bufferStream.on('data', buffers.push.bind(buffers));
        bufferStream.on('end', () => resolve(Buffer.concat(buffers)));
        bufferStream.on('error', reject);

        doc.pipe(bufferStream);

        // Title
        doc.fontSize(20).text('Your Personalized Travel Itinerary', { align: 'center' });

        // User Preferences
        doc.moveDown().fontSize(12).text(`Budget: ${userPreferences.budget}`);
        doc.text(`Interests: ${userPreferences.interests.join(', ')}`);
        if(userPreferences.activities) doc.text(`Activities: ${userPreferences.activities.join(', ')}`);
        doc.text(`Travel Dates: ${userPreferences.startDate} to ${userPreferences.endDate}`);
        doc.moveDown();

        // Loop through places and add details
        places.forEach((place, index) => {
            doc.fontSize(16).text(`${index + 1}. ${place.name}`, { underline: true });
            doc.fontSize(12).text(`Location: ${place.location.city}, ${place.location.country}`);
            doc.text(`Description: ${place.description}`);
            doc.text(`Activities: ${place.activities.join(', ')}`);
            doc.text(`Best Time to Visit: ${place.preferredMonths.join(', ')}`);
            doc.text(`Average Cost: ${place.averageCost}`);
            doc.moveDown();

            // Hotels information
            if (place.recommendedHotel) {
                doc.text(`Recommended Hotel: ${place.recommendedHotel.name}`);
                doc.text(`Cost per Night: ${place.recommendedHotel.costPerNight}`);
                doc.text(`Hotel Rating: ${place.recommendedHotel.rating}`);
            }

            doc.moveDown();
        });

        doc.end();
    });
};

module.exports = { generatePDF };
