export function addLeftPanelInfo(spaceObjectInfo) {
    const planetInfoDiv = document.createElement('div');
    planetInfoDiv.classList.add('left-info');

    const planetTitle = document.createElement('p');
    planetTitle.classList.add('panel-title');
    planetTitle.textContent = spaceObjectInfo.nombre;
    planetTitle.style.backgroundColor = spaceObjectInfo.color;
    planetInfoDiv.appendChild(planetTitle);

    const planetDetails = document.createElement('div');
    planetDetails.classList.add('left-details');

    for (const [key, value] of Object.entries(spaceObjectInfo)) {
        if (key !== "nombre" && key !== "color") {
            if (typeof value === 'object' && value !== null) {
                const nestedDiv = document.createElement('div');
                nestedDiv.classList.add('nested-info');
                const nestedTitle = document.createElement('p');
                nestedTitle.classList.add('nested-title');
                nestedTitle.textContent = key.replace(/([A-Z])/g, ' $1').toUpperCase() + ":";
                nestedDiv.appendChild(nestedTitle);

                if (Array.isArray(value)) {
                    value.forEach(item => {
                        const nestedItem = document.createElement('p');
                        nestedItem.classList.add('nested-item');
                        nestedItem.innerHTML = `<strong>${item}</strong>`;
                        nestedDiv.appendChild(nestedItem);
                    });
                } else {
                    for (const [subKey, subValue] of Object.entries(value)) {
                        const nestedDetail = document.createElement('p');
                        nestedDetail.innerHTML = `<strong>${subKey.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${subValue}`;
                        nestedDiv.appendChild(nestedDetail);
                    }
                }
                planetDetails.appendChild(nestedDiv);
            } else {
                const detailP = document.createElement('p');
                detailP.innerHTML = `<strong>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${value}`;
                planetDetails.appendChild(detailP);
            }
        }
    }

    planetInfoDiv.appendChild(planetDetails);
    //document.getElementById('left-info-panel').innerHTML = "";
    const leftPanel = document.getElementById('left-info-panel');
    leftPanel.innerHTML = "";
    leftPanel.appendChild(planetInfoDiv);
}