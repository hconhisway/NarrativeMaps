// Function to fetch case names from JSON files and populate the navbar
async function populateNavbarWithCaseNames() {
    const navbar = document.getElementById('sidebar');
    const ul = document.createElement('ul');
    navbar.appendChild(ul);
  
    // Assuming JSON files are named case_1.json, case_2.json, ..., case_6.json in the data directory
    for (let i = 1; i <= 6; i++) {
      try {
        // Correctly call fetch without template literals around the URL
        const response = await fetch(`./data/case_${i}.json`);
        if (!response.ok) throw new Error('Network response was not ok.');
        const caseData = await response.json();
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#case_${i}`;
        // Check if caseName exists, otherwise use a default name
        a.textContent = caseData.caseName || `Case ${i}`;
        a.dataset.caseId = i;
        li.appendChild(a);
        ul.appendChild(li);
            
        // Add click event listener to load case details
        a.addEventListener('click', (e) => {
        e.preventDefault();
        loadCaseDetails(i);
      });
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    }
  }

// Function to load and display case details
async function loadCaseDetails(caseId) {
    try {
      const response = await fetch(`./data/case_${caseId}.json`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const caseData = await response.json();
      const layout = getBoxLayout(caseData);
      d3.select("#sumGroup").selectAll("*").remove();
      drawBox(layout);
      drawlines(layout);
      function handleZoom(e) {
        d3.select('svg g')
          .attr('transform', e.transform);
      }
      const svg = d3.select('svg');
      const zoom = d3.zoom()
        .on('zoom', handleZoom);
      svg.call(zoom);
      // const caseDetailsSection = document.getElementById('case-details');
      // const caseContentDiv = document.getElementById('case-content');

      // Clear previous content
      // caseContentDiv.innerHTML = '';
  
      // Convert the JSON object to a formatted string
      // const jsonString = JSON.stringify(caseData, null, 2);
  
      // Insert the stringified JSON into a <pre> element to preserve formatting
      // caseContentDiv.innerHTML = `<pre>${jsonString}</pre>`;
  
      // Show the case details section
      // caseDetailsSection.style.display = 'block';
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  }
  
  // Call the function to populate the navbar on document load
  document.addEventListener('DOMContentLoaded', populateNavbarWithCaseNames);