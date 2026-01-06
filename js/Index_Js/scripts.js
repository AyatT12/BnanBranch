// <!-- show main carouse items by bottons ( etc ,مؤجرة , احصائيات) -->
// <!-- and control Pagination -->
const carouselsConfig = {
            1: { currentPage: 0, itemsPerPage: 3, filteredCars: [] },
            2: { currentPage: 0, itemsPerPage: 3, filteredCars: [] },
            3: { currentPage: 0, itemsPerPage: 3, filteredCars: [] },
            4: { currentPage: 0, itemsPerPage: 3, filteredCars: [] },
            5: { currentPage: 0, itemsPerPage: 3, filteredCars: [] }
        };
        // ===============added=================== //
        let previousWidth = window.innerWidth;

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        // ================================== //
        document.addEventListener('DOMContentLoaded', function () {
            for (let i = 1; i <= 5; i++) {
                initCarousel(i);
            }
            showCarouselItem(1);
            // ===============added=================== //
            window.addEventListener(
                "resize",
                debounce(() => {
                const currentWidth = window.innerWidth;
                if (currentWidth !== previousWidth) {
                    previousWidth = currentWidth;
                    for (let i = 1; i <= 5; i++) {
                    updateItemsPerPage(i);
                    }
                }
                }, 50)
            );
          // ================================= //
        });

        function initCarousel(carouselNumber) {
          const carItems = document.querySelectorAll(
            `#carouselItem${carouselNumber} .car-item`
          );
          const config = carouselsConfig[carouselNumber];
          config.filteredCars = Array.from(carItems);

          document
            .getElementById(`prevBtn${carouselNumber}`)
            ?.addEventListener("click", function () {
              if (config.currentPage > 0) {
                config.currentPage--;
                showPage(carouselNumber);
              }
            });

          document
            .getElementById(`nextBtn${carouselNumber}`)
            ?.addEventListener("click", function () {
              if (
                (config.currentPage + 1) * config.itemsPerPage <
                config.filteredCars.length
              ) {
                config.currentPage++;
                showPage(carouselNumber);
              }
            });

          // Set up event listener for filter
          document
            .getElementById(`carFilter${carouselNumber}`)
            ?.addEventListener("change", function (e) {
              const selectedType = e.target.value;

              if (selectedType === "all") {
                config.filteredCars = Array.from(carItems);
              } else {
                config.filteredCars = Array.from(carItems).filter(
                  (car) => car.getAttribute("data-type") === selectedType
                );
              }

              config.currentPage = 0;
              showPage(carouselNumber);
            });

          showPage(carouselNumber);
        // ===============edited=================== //
         updateItemsPerPage(carouselNumber);
        }
        // ================================== //
        function updateItemsPerPage(carouselNumber) {
            const config = carouselsConfig[carouselNumber];
        // ===============edited=================== //
            const previousItemsPerPage = config.itemsPerPage;
            console.log(window.innerWidth)
            if (window.innerWidth <= 1199) {
  
                 config.itemsPerPage = 2;
                console.log(2)
            } else {
                config.itemsPerPage = 3;
                console.log(3)
            }
            if (previousItemsPerPage !== config.itemsPerPage) {
              config.currentPage = 0;
              showPage(carouselNumber);
            }
        // ================================== //
        }

        function showPage(carouselNumber) {
            const config = carouselsConfig[carouselNumber];
            const carItems = document.querySelectorAll(`#carouselItem${carouselNumber} .car-item`);
            const startIndex = config.currentPage * config.itemsPerPage;
            const endIndex = startIndex + config.itemsPerPage;

            carItems.forEach(car => {
                car.style.display = 'none';
            });

            config.filteredCars.forEach((car, index) => {
                if (index >= startIndex && index < endIndex) {
                    car.style.display = 'block';
                }
            });

            if (document.getElementById(`prevBtn${carouselNumber}`)) {
                document.getElementById(`prevBtn${carouselNumber}`).disabled = config.currentPage === 0;
                document.getElementById(`nextBtn${carouselNumber}`).disabled = endIndex >= config.filteredCars.length;
            }
        }

        function showCarouselItem(itemNumber, event) {
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active1');
            });

            if (event && event.currentTarget) {
                event.currentTarget.classList.add('active1');
            }

            const carouselItems = document.getElementsByClassName('main-carousel-item');
            for (let i = 0; i < carouselItems.length; i++) {
                carouselItems[i].classList.remove('active');
            }

            const carouselItem = document.getElementById(`carouselItem${itemNumber}`);
            if (carouselItem) {
                carouselItem.classList.add('active');
                showPage(itemNumber);
            }
        }

    // <!-- عرض البيانات التفصيلية للسيارات المتاحة -->
    // بيانات السيارات
   const carsData = {
    0: {
        title: "هيونداي - النترا - سيدان متوسطة - 2019 - و ق ق 6417 - عودي",
        phone: "6923958732",
        pricing: {
            daily: '160.00',
            weekly: '950.00',
            monthly: '3,200.00'
        },
        rental: {
            dailyKm: 320,
            extraKmPrice: 1.45,
            freeHours: 1,
            maxHours: 12,
            extraHourPrice: 35.00,
            cancelHours: 4,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "غير متوفرة",
            minAge: 21
        },
        documents: {
            license: { date: "2028/03/15", DaysLeft: "45", status: "valid" },
            insurance: { date: "2025/12/20", DaysLeft: "2", status: "expired" },
            operatingCard: { date: "2026/02/28", DaysLeft: "85", status: "valid" },
            inspection: { date: "2026/01/05", DaysLeft: "18", status: "valid" }
        },
        maintenance: {
            tires: { date: "2025/11/30", DaysLeft: "3", Days_status: "expired", km: "28,500", KilosLeft: "320", Km_status: "expired" },
            oil: { date: "2026/04/15", DaysLeft: "120", Days_status: "valid", km: "7,800", KilosLeft: "450", Km_status: "valid" },
            service: { date: "2025/10/10", DaysLeft: "1", Days_status: "expired", km: "8,200", KilosLeft: "680", Km_status: "valid" },
            Front_brakes: { date: "2026/05/10", DaysLeft: "145", Days_status: "valid", km: "15,200", KilosLeft: "2,100", Km_status: "valid" },
            Rear_brake: { date: "2026/03/20", DaysLeft: "92", Days_status: "valid", km: "18,500", KilosLeft: "1,800", Km_status: "valid" }
        }
    },
    1: {
        title: "كيا - كارنيفال أي اكس جان 8 - عائلية كبيرة - 2020 - ح س و 8630 - أصفر",
        phone: "5551234567",
        pricing: {
            daily: '550.00',
            weekly: '3,200.00',
            monthly: '11,500.00'
        },
        rental: {
            dailyKm: 380,
            extraKmPrice: 2.25,
            freeHours: 0,
            maxHours: 0,
            extraHourPrice: 45.00,
            cancelHours: 5,
            extraDriver: "متوفر",
            options: "متوفرة",
            additions: "متوفرة",
            minAge: "22 - 75"
        },
        documents: {
            license: { date: "2027/06/20", DaysLeft: "25", status: "valid" },
            insurance: { date: "2025/11/15", DaysLeft: "0", status: "expired" },
            operatingCard: { date: "2026/03/10", DaysLeft: "95", status: "valid" },
            inspection: { date: "2025/09/05", DaysLeft: "4", status: "expired" }
        },
        maintenance: {
            tires: { date: "2026/01/15", DaysLeft: "88", Days_status: "valid", km: "32,000", KilosLeft: "1,200", Km_status: "valid" },
            oil: { date: "2025/12/01", DaysLeft: "2", Days_status: "expired", km: "9,500", KilosLeft: "280", Km_status: "expired" },
            service: { date: "2026/02/28", DaysLeft: "135", Days_status: "valid", km: "6,800", KilosLeft: "950", Km_status: "valid" },
            Front_brakes: { date: "2025/10/25", DaysLeft: "0", Days_status: "expired", km: "22,300", KilosLeft: "150", Km_status: "expired" },
            Rear_brake: { date: "2026/06/15", DaysLeft: "182", Days_status: "valid", km: "20,100", KilosLeft: "2,400", Km_status: "valid" }
        }
    },
    2: {
        title: "فورد - تورس - سيدان متوسطة - 2019 - س ك ب 3965 - عودي",
        phone: "9876543210",
        pricing: {
            daily: '270.00',
            weekly: '1,350.00',
            monthly: '4,800.00'
        },
        rental: {
            dailyKm: 280,
            extraKmPrice: 1.35,
            freeHours: 3,
            maxHours: 18,
            extraHourPrice: 28.00,
            cancelHours: 3,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "متوفرة",
            minAge: "21 - 78"
        },
        documents: {
            license: { date: "2026/08/10", DaysLeft: "210", status: "valid" },
            insurance: { date: "2025/10/30", DaysLeft: "0", status: "expired" },
            operatingCard: { date: "2026/05/15", DaysLeft: "110", status: "valid" },
            inspection: { date: "2025/11/20", DaysLeft: "1", status: "expired" }
        },
        maintenance: {
            tires: { date: "2026/03/01", DaysLeft: "125", Days_status: "valid", km: "26,500", KilosLeft: "100", Km_status: "expired" },
            oil: { date: "2025/09/15", DaysLeft: "0", Days_status: "expired", km: "8,700", KilosLeft: "1000", Km_status: "valid" },
            service: { date: "2026/01/30", DaysLeft: "98", Days_status: "valid", km: "7,200", KilosLeft: "1,100", Km_status: "valid" },
            Front_brakes: { date: "2026/04/05", DaysLeft: "0", Days_status: "expired", km: "17,800", KilosLeft: "50", Km_status: "expired" },
            Rear_brake: { date: "2025/12/10", DaysLeft: "12", Days_status: "valid", km: "19,200", KilosLeft: "650", Km_status: "valid" }
        }
    },
    3: {
        title: "كيا - نيرو - اقتصادية - 2019 - ى ط ك 5078 - بيج",
        phone: "9876543210",
        pricing: {
            daily: '480.00',
            weekly: '2,650.00',
            monthly: '8,800.00'
        },
        rental: {
            dailyKm: 260,
            extraKmPrice: 1.30,
            freeHours: 2,
            maxHours: 20,
            extraHourPrice: 26.00,
            cancelHours: 2,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "متوفرة",
            minAge: "20 - 80"
        },
        documents: {
            license: { date: "2026/07/12", DaysLeft: "185", status: "valid" },
            insurance: { date: "2025/12/05", DaysLeft: "4", status: "expired" },
            operatingCard: { date: "2026/04/20", DaysLeft: "105", status: "valid" },
            inspection: { date: "2026/01/14", DaysLeft: "12", status: "valid" }
        },
        maintenance: {
            tires: { date: "2025/10/20", DaysLeft: "0", Days_status: "expired", km: "27,800", KilosLeft: "700", Km_status: "valid" },
            oil: { date: "2026/02/15", DaysLeft: "75", Days_status: "valid", km: "8,400", KilosLeft: "520", Km_status: "valid" },
            service: { date: "2025/11/30", DaysLeft: "2", Days_status: "expired", km: "7,900", KilosLeft: "650", Km_status: "valid" },
            Front_brakes: { date: "2025/09/28", DaysLeft: "0", Days_status: "expired", km: "16,500", KilosLeft: "180", Km_status: "expired" },
            Rear_brake: { date: "2026/03/25", DaysLeft: "108", Days_status: "valid", km: "14,800", KilosLeft: "2,150", Km_status: "valid" }
        }
    },
    4: {
        title: "هيونداي - النترا - سيدان متوسطة - 2019 - و ق ق 6417 - عودي",
        phone: "6923958732",
        pricing: {
            daily: '160.00',
            weekly: '950.00',
            monthly: '3,200.00'
        },
        rental: {
            dailyKm: 320,
            extraKmPrice: 1.45,
            freeHours: 1,
            maxHours: 12,
            extraHourPrice: 35.00,
            cancelHours: 4,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "غير متوفرة",
            minAge: 21
        },
        documents: {
            license: { date: "2028/03/15", DaysLeft: "45", status: "valid" },
            insurance: { date: "2025/12/20", DaysLeft: "2", status: "expired" },
            operatingCard: { date: "2026/02/28", DaysLeft: "85", status: "valid" },
            inspection: { date: "2026/01/05", DaysLeft: "18", status: "valid" }
        },
        maintenance: {
            tires: { date: "2025/11/30", DaysLeft: "3", Days_status: "expired", km: "28,500", KilosLeft: "320", Km_status: "expired" },
            oil: { date: "2026/04/15", DaysLeft: "120", Days_status: "valid", km: "7,800", KilosLeft: "450", Km_status: "valid" },
            service: { date: "2025/10/10", DaysLeft: "1", Days_status: "expired", km: "8,200", KilosLeft: "680", Km_status: "valid" },
            Front_brakes: { date: "2026/05/10", DaysLeft: "145", Days_status: "valid", km: "15,200", KilosLeft: "2,100", Km_status: "valid" },
            Rear_brake: { date: "2026/03/20", DaysLeft: "92", Days_status: "valid", km: "18,500", KilosLeft: "1,800", Km_status: "valid" }
        }
    },
    5: {
        title: "هيونداي - النترا - سيدان متوسطة - 2019 - و ق ق 6417 - عودي",
        phone: "6923958732",
        pricing: {
            daily: '160.00',
            weekly: '950.00',
            monthly: '3,200.00'
        },
        rental: {
            dailyKm: 320,
            extraKmPrice: 1.45,
            freeHours: 1,
            maxHours: 12,
            extraHourPrice: 35.00,
            cancelHours: 4,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "غير متوفرة",
            minAge: 21
        },
        documents: {
            license: { date: "2028/03/15", DaysLeft: "45", status: "valid" },
            insurance: { date: "2025/12/20", DaysLeft: "2", status: "expired" },
            operatingCard: { date: "2026/02/28", DaysLeft: "85", status: "valid" },
            inspection: { date: "2026/01/05", DaysLeft: "18", status: "valid" }
        },
        maintenance: {
            tires: { date: "2025/11/30", DaysLeft: "3", Days_status: "expired", km: "28,500", KilosLeft: "320", Km_status: "expired" },
            oil: { date: "2026/04/15", DaysLeft: "120", Days_status: "valid", km: "7,800", KilosLeft: "450", Km_status: "valid" },
            service: { date: "2025/10/10", DaysLeft: "1", Days_status: "expired", km: "8,200", KilosLeft: "680", Km_status: "valid" },
            Front_brakes: { date: "2026/05/10", DaysLeft: "145", Days_status: "valid", km: "15,200", KilosLeft: "2,100", Km_status: "valid" },
            Rear_brake: { date: "2026/03/20", DaysLeft: "92", Days_status: "valid", km: "18,500", KilosLeft: "1,800", Km_status: "valid" }
        }
    },
    6: {
        title: "هيونداي - النترا - سيدان متوسطة - 2019 - و ق ق 6417 - عودي",
        phone: "6923958732",
        pricing: {
            daily: '160.00',
            weekly: '950.00',
            monthly: '3,200.00'
        },
        rental: {
            dailyKm: 320,
            extraKmPrice: 1.45,
            freeHours: 1,
            maxHours: 12,
            extraHourPrice: 35.00,
            cancelHours: 4,
            extraDriver: "متوفر",
            options: "غير متوفرة",
            additions: "غير متوفرة",
            minAge: 21
        },
        documents: {
            license: { date: "2028/03/15", DaysLeft: "45", status: "valid" },
            insurance: { date: "2025/12/20", DaysLeft: "2", status: "expired" },
            operatingCard: { date: "2026/02/28", DaysLeft: "85", status: "valid" },
            inspection: { date: "2026/01/05", DaysLeft: "18", status: "valid" }
        },
        maintenance: {
            tires: { date: "2025/11/30", DaysLeft: "3", Days_status: "expired", km: "28,500", KilosLeft: "320", Km_status: "expired" },
            oil: { date: "2026/04/15", DaysLeft: "120", Days_status: "valid", km: "7,800", KilosLeft: "450", Km_status: "valid" },
            service: { date: "2025/10/10", DaysLeft: "1", Days_status: "expired", km: "8,200", KilosLeft: "680", Km_status: "valid" },
            Front_brakes: { date: "2026/05/10", DaysLeft: "145", Days_status: "valid", km: "15,200", KilosLeft: "2,100", Km_status: "valid" },
            Rear_brake: { date: "2026/03/20", DaysLeft: "92", Days_status: "valid", km: "18,500", KilosLeft: "1,800", Km_status: "valid" }
        }
    },
};

        function loadCarDetails(button) {
            const carId = button.getAttribute('data-car-id');
            const carData = carsData[carId];

            if (!carData) {
                console.error('بيانات السيارة غير موجودة');
                return;
            }

            document.getElementById('modalCarTitle').innerHTML = `
                <i class="bi bi-car-front mx-2"></i>${carData.title}
            `;


            loadRentalTab(carData);

            loadDocumentsTab(carData);

            loadMaintenanceTab(carData);

        }

        // تحديث بنود التأجير
        function loadRentalTab(carData) {
            const rentalContent = document.getElementById('rentalContent');
            rentalContent.innerHTML = `
                <div class="col-lg-8">
                    <div class="info-card">
                        <div class="info-item">
                            <div class="info-label">
                                كيلومترات مجانية يومياً
                            </div>
                            <span class="info-value">${carData.rental.dailyKm} كم</span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                قيمة الكيلو الإضافي
                            </div>
                            <span class="info-value">${carData.rental.extraKmPrice} </span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                الساعات المجانية
                            </div>
                            <span class="info-value">${carData.rental.freeHours}</span>
                        </div>
                         <div class="info-item">
                            <div class="info-label">
                               الحد الاعلى للساعات
                            </div>
                            <span class="info-value">${carData.rental.maxHours}</span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                قيمة الساعة الإضافية
                            </div>
                            <span class="info-value">${carData.rental.extraHourPrice} </span>
                        </div>
                          <div class="info-item">
                            <div class="info-label">
                                ساعات إلغاء الحجز
                            </div>
                            <span class="info-value">${carData.rental.cancelHours} </span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                سائق إضافي
                            </div>
                            <span class="info-value ${carData.rental.extraDriver === 'متوفر' ? 'available' : 'not-available'}">${carData.rental.extraDriver}</span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                الخيارات
                            </div>
                            <span class="info-value ${carData.rental.options === 'متوفرة' ? 'available' : 'not-available'}">${carData.rental.options}</span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                الإضافات
                            </div>
                            <span class="info-value ${carData.rental.additions === 'متوفرة' ? 'available' : 'not-available'}">${carData.rental.additions}</span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                العمر
                            </div>
                            <span class="info-value">${carData.rental.minAge} </span>
                        </div>
                    </div>
                </div>
                
              
            `;
        }

        // تحديث الوثائق
        function loadDocumentsTab(carData) {
            const documentsContent = document.getElementById('documentsContent');

            const getStatusClass = (status) => {
                switch (status) {
                    case 'valid': return 'status-valid';
                    case 'warning': return 'status-warning';
                    case 'expired': return 'status-expired';
                    default: return 'status-valid';
                }
            };

            const getStatusIcon = (status) => {
                switch (status) {
                    case 'valid': return 'bi-check-circle';
                    case 'warning': return 'bi-exclamation-triangle';
                    case 'expired': return 'bi-x-circle';
                    default: return 'bi-check-circle';
                }
            };

            documentsContent.innerHTML = `

                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="info-item">
                            
                            <div class="info-label d-flex">
                                <div class="info-status  ${getStatusClass(carData.documents.license.status)}"></div>
                                رخصة السير
                            </div>
                            <span class="status-badge">
                                ${carData.documents.license.date}
                                 <span class="Days-left-badge ${carData.documents.license.status === 'expired' ? 'expired' : ''}">
                                  المتبقي
                                (${carData.documents.license.DaysLeft})
                                    يوم
                                </span>
                            </span>
                           
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                <div class="info-status ${getStatusClass(carData.documents.insurance.status)}"></div>
                                وثيقة تأمين
                            </div>
                            <span class="status-badge ">
                                 ${carData.documents.insurance.date}
                                 <span class="Days-left-badge ${carData.documents.insurance.status === 'expired' ? 'expired' : ''}">
                                 المتبقي
                                (${carData.documents.insurance.DaysLeft})
                                  يوم

                            </span>
                        </div>
                         <div class="info-item">
                            <div class="info-label">
                                <div class="info-status ${getStatusClass(carData.documents.operatingCard.status)}"></div>
                                بطاقة تشغيل
                            </div>
                            <span class="status-badge">
                               ${carData.documents.operatingCard.date}
                                 <span class="Days-left-badge ${carData.documents.operatingCard.status === 'expired' ? 'expired' : ''}">
                                 المتبقي
                                  (${carData.documents.operatingCard.DaysLeft})
                                يوم

                            </span>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                <div class="info-status ${getStatusClass(carData.documents.inspection.status)}"></div>
                                الفحص الدوري
                            </div>
                            <span class="status-badge">
                                 ${carData.documents.inspection.date}
                                    <span class="Days-left-badge ${carData.documents.inspection.status === 'expired' ? 'expired' : ''}">
                                    المتبقي
                                    (${carData.documents.inspection.DaysLeft})
                                     يوم
                            </span>
                        </div>
                    </div>
                   
                </div>
              
            `;
        }

        // تحديث الصيانة
        function loadMaintenanceTab(carData) {
            console.log(carData.maintenance);
            const maintenanceContent = document.getElementById('maintenanceContent');
            maintenanceContent.innerHTML = `
                <div class="row g-1">
                 <div class="col-lg-4">
                     <div class="maintenance-item">
                     <div class="maintenance-title">
                         الإطارات
                    </div>
                    <div class="maintenance-info">
                            <p>
                                <strong>${carData.maintenance.tires.date}</strong> 
                                <span> - </span>
                                <strong>${carData.maintenance.tires.km} كم</strong> 
                             </p>
                              <p style="font-size: 10px;">
                                <strong style="color:#495057"> المتبقي: </strong>
                                <strong class="${carData.maintenance.tires.Days_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.tires.DaysLeft})يوم </strong> 
                                <span> - </span>
                                <strong class="${carData.maintenance.tires.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.tires.KilosLeft})كم </strong> 
                             </p>
                    </div>
                </div>
                </div>

                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                      زيت المكينة
                    </div>
                    <div class="maintenance-info">
                            <p>
                                <strong>${carData.maintenance.oil.date}</strong> 
                                <span> - </span>
                                <strong>${carData.maintenance.oil.km} كم</strong> 
                             </p>
                                <p style="font-size: 10px;">
                                <strong style="color:#495057"> المتبقي: </strong>
                                    <strong class="${carData.maintenance.oil.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.oil.DaysLeft})يوم</strong> 
                                    <span> - </span>
                                    <strong class="${carData.maintenance.oil.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.oil.KilosLeft})كم</strong>
                                </p>
                    </div>
                    </div>
                </div>               
                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                        الصيانة الدورية
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.service.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.service.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                             <strong style="color:#495057"> المتبقي: </strong>
                             <strong class="${carData.maintenance.service.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.service.DaysLeft})يوم</strong> 
                             <span> - </span>
                             <strong class="${carData.maintenance.service.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.service.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                     الفرامل الخلفية
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.Rear_brake.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.Rear_brake.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.Rear_brake.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.Rear_brake.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.Rear_brake.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.Rear_brake.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                </div>      
                    <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                     الفرامل الأمامية
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.Front_brakes.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.Front_brakes.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.Front_brakes.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.Front_brakes.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.Front_brakes.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.Front_brakes.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                </div>    
                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                    زيت المكينة
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.oil.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.oil.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.oil.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.oil.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.oil.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.oil.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                     
                </div>
                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                      زيت المكينة
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.oil.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.oil.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.oil.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.oil.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.oil.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.oil.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                </div>      
                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                      زيت المكينة
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.oil.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.oil.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.oil.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.oil.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.oil.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.oil.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                </div>      
                <div class="col-lg-4">
                    <div class="maintenance-item">
                    <div class="maintenance-title">
                      زيت المكينة
                    </div>
                    <div class="maintenance-info">
                        <p>
                            <strong>${carData.maintenance.oil.date}</strong> 
                            <span> - </span>
                            <strong>${carData.maintenance.oil.km} كم</strong> 
                        </p>
                        <p style="font-size: 10px;">
                            <strong style="color:#495057"> المتبقي: </strong>
                            <strong class="${carData.maintenance.oil.Days_status === 'expired' ? 'expired' : ''}" >(${carData.maintenance.oil.DaysLeft})يوم</strong> 
                            <span> - </span>
                            <strong class="${carData.maintenance.oil.Km_status === 'expired' ? 'expired' : ''}">(${carData.maintenance.oil.KilosLeft})كم</strong>
                        </p>
                    </div>
                    </div>
                </div>      
                </div>
            `;
        }     
    // <!-- Toggle Reasons List For Not Avaliables Cars -->
    function toggleReasons(button) {
            const reasonsList = button.nextElementSibling;
            const chevron = button.querySelector('.fa-chevron-down');

            reasonsList.classList.toggle('show');

            if (reasonsList.classList.contains('show')) {
                chevron.style.transform = 'rotate(180deg)';
            } else {
                chevron.style.transform = 'rotate(0deg)';
            }
    }
   // Close the warnning nav
    function closeWarning() {
            const warningSection = document.getElementById('warningSection');
            warningSection.style.transform = 'translateY(-100%)';
            warningSection.style.opacity = '0';
            setTimeout(() => {
                warningSection.style.display = 'none';
            }, 300);
    }


    // add active class to the clicked button and remove from others
    function setActiveButton(buttonIndex) {
    var buttons = document.querySelectorAll('.btn-secondary1');

    // Remove the active class from all buttons
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active1');
    }

    // Set the active class for the clicked button
    buttons[buttonIndex].classList.add('active1');
}

/////////////function to submit branch name without button/////////////
$(document).ready(function () {
    $("#branchList").change(function () {
        $("#Branch_Form").submit();
    });
});