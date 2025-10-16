 const config = {
            pdfUrl: 'your-brochure.pdf', // Replace with your PDF file path
            pdfFileName: 'Company-Brochure.pdf', // Name for downloaded file
            brochureImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=700&fit=crop' // Replace with your brochure cover image
        };

        // Set the brochure image
        document.getElementById('brochureImage').src = config.brochureImageUrl;

        // View button - Opens PDF in new tab
        document.getElementById('viewBtn').addEventListener('click', function() {
            window.open(config.pdfUrl, '_blank');
        });

        // Download button - Downloads PDF directly
        document.getElementById('downloadBtn').addEventListener('click', function() {
            downloadPDF(config.pdfUrl, config.pdfFileName);
        });

        // Function to download PDF
        function downloadPDF(url, filename) {
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = '_blank';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            showSuccessMessage();
        }

        // Show success message
        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            
            setTimeout(() => {
                message.classList.remove('show');
            }, 3000);
        }