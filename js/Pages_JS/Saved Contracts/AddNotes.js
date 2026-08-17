(function () {
  const items = [
    { id: "Fuel", label: "الوقود", options: ["ممتلئ", "3/4", "1/2", "1/4", "فارغ"] },
    { id: "Air_conditioner", label: "التكييف", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Radio_Recorder", label: "الراديو / المسجل", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Internal_Screen", label: "الشاشة الداخلية", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Speedometer", label: "عداد السرعة", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Interior_Upholstery", label: "الفرش الداخلي", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Spare_Tire_Tools", label: "معدات الكفر الإحتياطي", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Tires", label: "العجلات", options: ["ممتلئ", "3/4", "1/2", "1/4", "فارغ"] },
    { id: "Spare_Tire", label: "العجلة الإحتياطية", options: ["ممتلئ", "3/4", "1/2", "1/4", "فارغ"] },
    { id: "First_Aid_Kit", label: "الإسعافات الأولية", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Key", label: "المفتاح", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Fire_Extinguisher", label: "طفاية الحريق", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Warning_Triangle", label: "المثلث العاكس", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Lights_Signals", label: "الانوار و إشارات الانعطاف", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Wipers", label: "المساحات", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Rims_Hubcaps", label: "الطاسات و الجنوط", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "License_Plates", label: "لوحات السيارة", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Sensors", label: "حساسات", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
    { id: "Cameras", label: "كاميرات", options: ["ممتاز", "جيد", "ضعيف", "لا يعمل", "موجود", "غير موجود"] },
  ];

  const handoverNotes = {
    Fuel: " لا يضيء مؤشر التحذير عند متبقي 10% إلى 15% من الخزان",
    Tires: "خدوش بسيطة في العجلة الأمامية"
  };

  const notes = {}; 

  const tbody = document.querySelector("#checkupTable tbody");

  function buildRow(item) {
    const optionsHtml = item.options
      .map((o) => `<option value="${o}">${o}</option>`)
      .join("");
    return `
      <tr>
        <td>
          <select class="form-select table-select-style" aria-label="Default select example">
            <option selected> </option>
            ${optionsHtml}
          </select>
        </td>
        <td class="note-td">
          <span class="note-corner" data-item="${item.id}"></span>
          <div class="options-col d-flex justify-content-between align-items-center">
            <div class="col-auto add-note-icon">
                <span class="note-cell" data-item="${item.id}"><i class="fa-solid fa-plus"></i></span>
            </div>             
            <div class="col d-flex justify-content-end align-items-center p-0" style="gap:8px;">
             <label for="${item.id}">${item.label}</label>
             <input type="checkbox" name="Examination-items" value="${item.id}" id="${item.id}">
            </div>
          </div>
        </td>
      </tr>`;
  }

  tbody.innerHTML = items.map(buildRow).join("");

  let activePopover = null;
  let currentItemId = null;

  const modalEl = document.getElementById("noteModal");
  const modal = new bootstrap.Modal(modalEl);
  const textarea = document.getElementById("noteTextarea");
  const charCount = document.getElementById("noteCharCount");
  const saveBtn = document.getElementById("saveNoteBtn");
  const deleteBtn = document.getElementById("deleteNoteBtn");
  const modalTitle = document.getElementById("noteModalLabel");
  
  const handoverContainer = document.getElementById("handoverNoteContainer");
  const handoverText = document.getElementById("handoverNoteText");

  function closePopover() {
    if (activePopover) {
      activePopover.remove();
      activePopover = null;
    }
  }

 function refreshCellVisual(itemId) {
  const cell = document.querySelector(`.note-cell[data-item="${itemId}"]`);
  const corner = document.querySelector(`.note-corner[data-item="${itemId}"]`);

  const hasPickupNote = !!notes[itemId];
  const hasHandoverNote = !!handoverNotes[itemId];
  const hasAnyNote = hasPickupNote || hasHandoverNote;

  if (cell) {
    cell.classList.toggle("has-note", hasPickupNote);
    if (hasAnyNote) {
      cell.style.display = "none";
    } else {
      cell.style.display = "inline-flex";
    }
  }

  if (corner) {
    corner.classList.toggle("has-note", hasAnyNote);
  }
}

  items.forEach(item => refreshCellVisual(item.id));

  function showPopover(cell, itemId) {
    closePopover();
    const handoverMsg = handoverNotes[itemId] ? `${handoverNotes[itemId]}<hr class="my-1" style="border-bottom: 1px dashed black;color:white">` : "";
    const pickupMsg = notes[itemId] ? `${notes[itemId]}` : "";
    
    const pop = document.createElement("div");
    pop.className = "note-popover show";
    pop.innerHTML = `${handoverMsg}${pickupMsg}<span class="note-edit-link">تعديل</span>`;
    document.body.appendChild(pop);

    const rect = cell.getBoundingClientRect();
    pop.style.top = window.scrollY + rect.bottom + 4 + "px";
    pop.style.left = window.scrollX + rect.left - 100 + "px";

    pop.querySelector(".note-edit-link").addEventListener("click", (e) => {
      e.stopPropagation();
      closePopover();
      openModal(itemId);
    });

    activePopover = pop;
  }

  function openModal(itemId) {
    currentItemId = itemId;
    const item = items.find((i) => i.id === itemId);
    modalTitle.textContent = item.label;

    if (handoverNotes[itemId]) {
      handoverText.textContent = handoverNotes[itemId];
      handoverContainer.style.display = "block";
    } else {
      handoverContainer.style.display = "none";
    }

    textarea.value = notes[itemId] || "";
    charCount.textContent = textarea.value.length;
    deleteBtn.style.display = notes[itemId] ? "inline-block" : "none";
    
    modal.show();
  }

  modalEl.addEventListener("shown.bs.modal", () => {
    textarea.focus();
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
  });

  document.addEventListener("click", (e) => {
    const corner = e.target.closest(".note-corner");
    if (corner) {
      showPopover(corner, corner.dataset.item);
      return;
    }

    const cell = e.target.closest(".note-cell");
    if (cell) {
      openModal(cell.dataset.item);
      return;
    }

    if (!e.target.closest(".note-popover")) {
      closePopover();
    }
  });

  textarea.addEventListener("input", () => {
    charCount.textContent = textarea.value.length;
  });

  saveBtn.addEventListener("click", () => {
    const val = textarea.value.trim();
    if (val) {
      notes[currentItemId] = val;
    } else {
      delete notes[currentItemId];
    }
    refreshCellVisual(currentItemId);
    modal.hide();
  });

  deleteBtn.addEventListener("click", () => {
    delete notes[currentItemId];
    refreshCellVisual(currentItemId);
    modal.hide();
  });

  const allCheckItems = document.getElementById("All_Check_items");
  if (allCheckItems) {
    allCheckItems.addEventListener("change", function () {
      document
        .querySelectorAll('input[name="Examination-items"]')
        .forEach((cb) => (cb.checked = this.checked));
    });
  }
})();