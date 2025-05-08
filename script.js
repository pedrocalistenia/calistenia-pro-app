<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calistenia PRO</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Estilos CSS (Modo Escuro, Timer, etc. - Mantidos da v14) */
        body {
            font-family: 'Inter', sans-serif;
            overscroll-behavior-y: contain;
            background-color: #1a202c; /* bg-gray-900 */
            color: #e2e8f0; /* text-gray-200 */
        }
        #appContainer {
            background-color: #2d3748; /* bg-gray-800 */
            color: #e2e8f0;
        }
        .app-header {
            background-color: #000000; 
            color: #7b8080; 
            padding: 1rem; 
            text-align: center;
            border-top-left-radius: 0.5rem; 
            border-top-right-radius: 0.5rem; 
        }
        .app-header h1 {
            font-family: 'Archivo Black', sans-serif; 
            font-size: 1.875rem; 
            font-weight: 400; 
            letter-spacing: 0.025em; 
            text-transform: uppercase; 
        }
        .pro-text-header { 
            font-weight: 400; 
            color: #FFFFFF; 
        }
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #2d3748;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #718096;
        }
        .action-button {
            transition: all 0.2s ease-in-out;
        }
        .action-button:active {
            transform: scale(0.95);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .media-display-area { 
            display: flex; 
            align-items: center;
            justify-content: center;
            width: 100%;
            aspect-ratio: 16 / 9; 
            border-radius: 0.5rem;
            background-color: #4a5568; 
            margin-bottom: 1rem; 
            overflow: hidden; 
        }
        .video-container, #circularTimerWrapper {
             width: 100%;
             height: 100%;
             flex-shrink: 0; 
        }
        .video-container {
            position: relative; 
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background-color: #1a202c; 
            color: #e2e8f0; 
            border: 1px solid #4a5568; 
            border-radius: 8px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
            font-size: 0.9rem;
        }
        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .toast.hide {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        
        #circularTimerWrapper { 
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        #circularTimerContainer {
            width: 150px; 
            height: 150px;
            margin-bottom: 0.75rem; 
        }
        #progressRing {
            transition: stroke-dashoffset 0.3s linear; 
        }
        .timer-controls-circular { 
            display: flex;
            gap: 0.75rem; 
            margin-top: 0.5rem; 
        }
        .timer-controls-circular button {
            padding: 0.5rem 1rem; 
            font-size: 0.875rem; 
            border-radius: 0.375rem; 
        }

        .exercise-card { 
            background-color: #4a5568; 
            color: #e2e8f0; 
            padding: 1.5rem; 
            border-radius: 0.75rem; 
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
            margin-bottom: 1.5rem;
        }
        .exercise-details-info { 
            background-color: #2d3748; 
            border: 1px solid #4a5568; 
            color: #cbd5e0; 
            padding: 1rem; 
            border-radius: 0.5rem; 
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); 
        }
        .exercise-details-info strong {
            color: #e2e8f0; 
        }

        #seriesInputArea label {
            font-weight: 500; 
            color: #cbd5e0; 
        }
        #repsInput {
            background-color: #2d3748; 
            color: #e2e8f0; 
            border: 1px solid #4a5568; 
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        #repsInput::placeholder {
            color: #a0aec0; 
        }
        #repsInput:focus {
            border-color: #63b3ed; 
            box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.3); 
        }
        
        #completeSeriesBtn {
            background-color: #38a169; 
        }
        #completeSeriesBtn:hover {
            background-color: #2f855a; 
        }
        .skip-exercise-btn {
            background-color: #c53030; 
            color: white;
        }
        .skip-exercise-btn:hover {
            background-color: #9b2c2c; 
        }
        #finishWorkoutBtn {
            background-color: #805ad5; 
        }
        #finishWorkoutBtn:hover {
            background-color: #6b46c1; 
        }

        .text-blue-500 { 
            color: #63b3ed; 
        }
        .text-blue-500:hover {
            color: #4299e1; 
        }
        #workoutButtonsContainer button {
            background-color: #4a5568; 
            color: #e2e8f0; 
            border: 1px solid #718096; 
        }
        #workoutButtonsContainer button:hover {
            background-color: #718096; 
        }

        .star-rating span {
            color: #facc15; 
            font-size: 1.25rem; 
            margin-right: 0.125rem; 
        }
        .star-rating .bonus-star {
            color: #fbbf24; 
        }
         .star-rating .empty-star {
            color: #718096; 
        }
        #workoutSummaryContent h4, #workoutStats h3 {
            color: #e2e8f0; 
        }
        #workoutSummaryContent .bg-gray-800, 
        #workoutStats .bg-gray-700 { 
            background-color: #2d3748; 
            color: #cbd5e0; 
        }
        #workoutSummaryContent .bg-gray-800 strong, 
        #workoutStats .bg-gray-700 strong {
            color: #e2e8f0; 
        }
        #motivationalMessage {
            color: #68d391; 
        }
        .force-hidden {
            display: none !important;
        }
        /* Estilo para o Loading Indicator */
        #loadingOverlay {
            position: fixed; /* Ou absolute se dentro de um container relativo */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6); /* Fundo semi-transparente */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1050; /* Acima do toast */
            color: white;
            font-size: 1.2rem;
        }
    </style>
</head>
<body class="bg-gray-900 text-gray-200 flex flex-col items-center justify-start min-h-screen pt-4 px-2 sm:px-4">

    <div id="appContainer" class="w-full max-w-md bg-gray-800 shadow-xl rounded-lg overflow-hidden relative"> <div id="fixedHeader" class="app-header hidden">
             <h1>CALISTENIA <span class="pro-text-header">PRO</span></h1>
        </div>

        <div id="homeScreen" class="text-center">
            <div class="app-header">
                <h1>CALISTENIA <span class="pro-text-header">PRO</span></h1>
            </div>
            <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-300 my-6" style="font-family: 'Inter', sans-serif;">Escolha seu nível</h2>
                <div class="space-y-4">
                    <button onclick="selectLevel('avancado')" class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg action-button">
                        Avançado 
                        <span class="block text-sm font-normal opacity-90">(10+ barras e 15+ dips)</span>
                    </button>
                    <button onclick="selectLevel('intermediario')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg action-button">
                        Intermediário 
                        <span class="block text-sm font-normal opacity-90">(3 pull ups e 3 dips)</span>
                    </button>
                    <button onclick="selectLevel('iniciante')" class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg action-button">
                        Iniciante 
                        <span class="block text-sm font-normal opacity-90">(0 pull ups e 0 push ups)</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="workoutListScreen" class="p-6 hidden">
            <button onclick="showScreen('homeScreen'); resetAppState();" class="mb-6 text-blue-400 hover:text-blue-500 font-semibold">← Voltar para Níveis</button>
            <div id="workoutButtonsContainer" class="space-y-3 mt-6"> 
                </div>
        </div>

        <div id="workoutExecutionScreen" class="p-6 hidden">
             <button onclick="confirmExitWorkout()" class="mb-4 text-blue-400 hover:text-blue-500 font-semibold">← Voltar para Lista de Treinos</button>
            
            <div class="exercise-card">
                <h3 id="exerciseName" class="text-2xl font-bold mb-1 text-center text-gray-100" style="font-family: 'Inter', sans-serif;">Nome do Exercício</h3>
                <p id="seriesProgressText" class="text-md text-gray-300 mb-4 text-center">Série X de Y</p>
                
                <div id="mediaDisplayArea" class="media-display-area">
                    <div id="videoPlayerContainer" class="video-container"> <p class="text-center text-gray-400 flex items-center justify-center h-full">Vídeo do exercício</p>
                    </div>
                    <div id="circularTimerWrapper" class="force-hidden"> <div id="circularTimerContainer" class="relative mx-auto">
                            <svg class="w-full h-full" viewBox="0 0 100 100">
                                <circle class="text-gray-600" stroke-width="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50"/>
                                <circle id="progressRing"
                                        class="text-blue-400" stroke-width="8"
                                        stroke-linecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="42" cx="50" cy="50"
                                        style="transform: rotate(-90deg); transform-origin: 50% 50%;"/>
                            </svg>
                            <div id="circularTimerText" class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-100">
                                00:00
                            </div>
                        </div>
                        <div class="timer-controls-circular">
                            <button id="pauseRestTimerBtn" onclick="pauseRestTimer()" class="bg-yellow-600 hover:bg-yellow-700 text-white action-button">Pausar</button>
                            <button id="skipRestTimerBtn" onclick="skipRest()" class="bg-gray-600 hover:bg-gray-700 text-white action-button">Pular</button>
                        </div>
                    </div>
                </div>

                <div class="exercise-details-info mt-4 text-center">
                    <p class="text-lg"><strong>Repetições Alvo:</strong> <span id="exerciseReps" class="font-medium text-gray-100"></span></p>
                </div>
            </div>

            <div id="seriesInputArea" class="mb-4 px-2">
                <label for="repsInput" class="block text-sm font-medium text-gray-300 mb-1">Quantas reps/tempo você fez nesta série? (Opcional)</label>
                <input type="text" id="repsInput" class="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:ring-blue-400 focus:border-blue-400 text-base bg-gray-700 text-gray-100" placeholder="Ex: 10 ou 30s">
            </div>
            
            <div class="flex flex-col items-center gap-2 mb-4">
                <button id="completeSeriesBtn" onclick="completeSeries()" class="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg action-button text-base">Concluir Série</button>
                <button id="skipExerciseBtn" onclick="confirmSkipExercise()" class="w-full max-w-xs skip-exercise-btn font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg action-button text-base">Pular Exercício Atual</button> 
            </div>
            
            <button id="finishWorkoutBtn" onclick="finishWorkout()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg mt-3 hidden action-button text-base">Finalizar Treino (Ver Resumo)</button>
        </div>

        <div id="summaryScreen" class="p-6 hidden text-center">
            <div id="workoutSummaryContent" class="bg-gray-700 p-4 rounded-lg shadow-md mb-6 text-left mt-6"> 
                </div>
            <div id="workoutStats" class="bg-gray-700 p-4 rounded-lg shadow-md mb-6 text-left"> 
                </div>
            <p id="motivationalMessage" class="text-lg text-green-400 font-semibold mb-8"></p>
            <button onclick="showScreen('homeScreen'); resetAppState();" class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg action-button">Voltar para o Início</button>
        </div>
        
        <div id="loadingOverlay" class="force-hidden">
             Carregando Treino...
        </div>
    </div>

    <div id="toastNotification" class="toast">Mensagem!</div>

    <script>
        // --- mockSheetData REMOVIDO --- 
        
        // --- ESTADO DA APLICAÇÃO ---
        let userProgressData = []; 
        let currentScreen = 'homeScreen';
        let selectedLevel = '';
        let selectedWorkoutName = '';
        let currentWorkout = []; 
        let currentExerciseIndex = 0;
        let currentSeriesNumber = 1; 
        let performanceData = []; 

        let restTimerInterval;
        let restTimerSeconds = 0;
        let totalRestDuration = 0; 
        let restTimerRunning = false;

        const ALL_SCREENS = ['homeScreen', 'workoutListScreen', 'workoutExecutionScreen', 'summaryScreen'];
        const fixedHeaderElement = document.getElementById('fixedHeader'); 
        const videoPlayerContainerElement = document.getElementById('videoPlayerContainer');
        const circularTimerWrapperElement = document.getElementById('circularTimerWrapper');
        const progressRingElement = document.getElementById('progressRing');
        const circularTimerTextElement = document.getElementById('circularTimerText');
        const mediaDisplayAreaElement = document.getElementById('mediaDisplayArea'); 
        const loadingOverlayElement = document.getElementById('loadingOverlay'); // Elemento do overlay
        
        let radius;
        let circumference;
        document.addEventListener('DOMContentLoaded', (event) => {
            radius = progressRingElement.getAttribute('r'); 
            if (radius) { 
                 radius = parseFloat(radius);
                 circumference = 2 * Math.PI * radius;
                 progressRingElement.style.strokeDasharray = `${circumference} ${circumference}`;
                 progressRingElement.style.strokeDashoffset = circumference;
            } else {
                console.error("Não foi possível encontrar o atributo 'r' no elemento progressRing.");
            }
        });


        // --- NAVEGAÇÃO E CONTROLE DE TELA ---
        function showScreen(screenId) {
            ALL_SCREENS.forEach(id => document.getElementById(id).classList.add('hidden'));
            document.getElementById(screenId).classList.remove('hidden');
            currentScreen = screenId;
            window.scrollTo(0, 0);

            if (screenId === 'homeScreen') {
                fixedHeaderElement.classList.add('hidden');
            } else {
                fixedHeaderElement.classList.remove('hidden');
                let headerTitleText = `CALISTENIA <span class="pro-text-header">PRO</span>`; 
                
                if (screenId === 'workoutExecutionScreen' || screenId === 'summaryScreen') {
                    if (selectedWorkoutName && selectedLevel) {
                        headerTitleText = `<span style="font-family: 'Inter', sans-serif; color: #cbd5e0; font-weight: 600; text-transform: none;">${selectedWorkoutName} <span class="text-lg font-normal">(${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)})</span></span>`;
                    }
                } else if (screenId === 'workoutListScreen' && selectedLevel) {
                     headerTitleText = `<span style="font-family: 'Inter', sans-serif; color: #cbd5e0; font-weight: 600; text-transform: none;">Nível ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</span>`;
                }
                
                let h1InHeader = fixedHeaderElement.querySelector('h1');
                if (!h1InHeader) {
                    h1InHeader = document.createElement('h1');
                    fixedHeaderElement.appendChild(h1InHeader);
                }
                h1InHeader.innerHTML = headerTitleText; 
            }
        }
        
        function resetAppState() {
            clearRestTimer(); 
            
            selectedLevel = ''; 
            selectedWorkoutName = '';
            currentWorkout = [];
            currentExerciseIndex = 0;
            currentSeriesNumber = 1;
            performanceData = [];

            document.getElementById('completeSeriesBtn').disabled = false;
            circularTimerWrapperElement.classList.add('force-hidden'); 
            videoPlayerContainerElement.classList.remove('force-hidden'); 
            mediaDisplayAreaElement.classList.remove('hidden');
            
            document.getElementById('seriesInputArea').classList.remove('hidden');
            document.getElementById('finishWorkoutBtn').classList.add('hidden');
            if (currentScreen === 'homeScreen') { 
                 fixedHeaderElement.classList.add('hidden');
            }
        }

        function selectLevel(level) {
            selectedLevel = level;
            const workoutButtonsContainer = document.getElementById('workoutButtonsContainer');
            workoutButtonsContainer.innerHTML = ''; 

            // Aqui você poderia buscar os nomes dos treinos disponíveis para o nível
            // via API ou ter uma lista pré-definida. Usando pré-definida por enquanto:
            ['Treino A', 'Treino B', 'Treino C', 'Treino D', 'Treino E'].forEach(workoutName => {
                const button = document.createElement('button');
                button.className = 'w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md action-button';
                button.textContent = workoutName;
                button.onclick = () => loadWorkout(workoutName);
                workoutButtonsContainer.appendChild(button);
            });
            showScreen('workoutListScreen');
        }
        
        function confirmExitWorkout() {
            const hasStartedWorkout = performanceData.some(ex => ex.seriesDone.length > 0);

            if (hasStartedWorkout && currentScreen === 'workoutExecutionScreen') {
                if (confirm("Você tem um treino em andamento. Deseja realmente sair e perder o progresso não salvo desta sessão?")) {
                    goBackToWorkoutListScreenClean();
                }
            } else {
                goBackToWorkoutListScreenClean();
            }
        }

        function goBackToWorkoutListScreenClean() {
            clearRestTimer();
            currentWorkout = [];
            currentExerciseIndex = 0;
            currentSeriesNumber = 1;
            performanceData = [];
            selectedWorkoutName = ''; 
            document.getElementById('completeSeriesBtn').disabled = false;
            circularTimerWrapperElement.classList.add('force-hidden'); 
            videoPlayerContainerElement.classList.remove('force-hidden');
            mediaDisplayAreaElement.classList.remove('hidden');
            
            document.getElementById('seriesInputArea').classList.remove('hidden');
            document.getElementById('finishWorkoutBtn').classList.add('hidden');
            showScreen('workoutListScreen'); 
        }

        // --- LÓGICA DE CARREGAMENTO DO TREINO (COM API) ---
        async function loadWorkout(workoutName) { 
            selectedWorkoutName = workoutName;
            
            // #############################################################
            // # COLE A URL DO SEU SCRIPT IMPLANTADO AQUI                  #
            // #############################################################
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNoVWfvR6iKcZ3iBIrPwOPH6ig9pF5uOitMceply-9EmLsI4nyfMYoMCBVVauARf1ukw/exec"; 
            // #############################################################

            if (SCRIPT_URL === "https://script.google.com/macros/s/AKfycbwNoVWfvR6iKcZ3iBIrPwOPH6ig9pF5uOitMceply-9EmLsI4nyfMYoMCBVVauARf1ukw/exec") {
                showToast("Erro: URL do Script não configurada no código HTML.", 5000);
                return;
            }
            
            const url = `${SCRIPT_URL}?level=${encodeURIComponent(selectedLevel)}&workout=${encodeURIComponent(workoutName)}`;
            
            showLoadingIndicator(); 

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    let errorMsg = `Erro HTTP: ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.error || errorMsg;
                    } catch (parseError) { /* Ignora erro de parse */ }
                    throw new Error(errorMsg);
                }
                
                currentWorkout = await response.json(); 

                if (!Array.isArray(currentWorkout)) {
                     throw new Error("Resposta da API não é um array de exercícios.");
                }

                // Atualiza performanceData com base nos dados recebidos da planilha
                performanceData = currentWorkout.map(ex => ({ 
                    exerciseId: ex.exercise_id, 
                    exerciseName: ex.exercise_name,
                    seriesTargetCount: parseInt(ex.series) || 0, // Garante que seja número
                    repsTargetString: ex.reps, 
                    restTimeString: ex.rest, // Armazena o tempo de descanso original
                    embedUrl: ex.embed_url, // Armazena a URL do vídeo
                    loadInfo: ex.load, // Armazena info de carga (opcional)
                    seriesDone: [] 
                }));

                hideLoadingIndicator(); 

                if (currentWorkout.length > 0) {
                    displayCurrentExerciseAndSeries();
                    showScreen('workoutExecutionScreen');
                    document.getElementById('finishWorkoutBtn').classList.add('hidden'); 
                } else {
                    showToast("Treino não encontrado ou vazio na planilha!");
                    goBackToWorkoutListScreenClean(); 
                }

            } catch (error) {
                hideLoadingIndicator(); 
                console.error("Erro ao carregar treino:", error);
                showToast(`Erro ao carregar: ${error.message}`, 5000);
                goBackToWorkoutListScreenClean(); 
            }
        }
        
        // Funções auxiliares para indicador de carregamento
        function showLoadingIndicator() {
            loadingOverlayElement.classList.remove('force-hidden');
        }
        function hideLoadingIndicator() {
            loadingOverlayElement.classList.add('force-hidden');
        }
        
        // --- LÓGICA DE EXECUÇÃO DO TREINO ---
        function displayCurrentExerciseAndSeries() {
            if (currentExerciseIndex >= performanceData.length) { // Usa performanceData.length
                finishWorkout(); 
                return;
            }

            // Usa os dados de performanceData que foram mapeados da planilha
            const exercisePerf = performanceData[currentExerciseIndex]; 
            document.getElementById('exerciseName').textContent = exercisePerf.exerciseName;
            document.getElementById('seriesProgressText').textContent = `Série ${currentSeriesNumber} de ${exercisePerf.seriesTargetCount}`;
            
            mediaDisplayAreaElement.classList.remove('hidden'); 
            videoPlayerContainerElement.classList.remove('force-hidden'); 
            circularTimerWrapperElement.classList.add('force-hidden'); 

            if (exercisePerf.embedUrl) { // Usa embedUrl
                 videoPlayerContainerElement.innerHTML = `<iframe src="${exercisePerf.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            } else {
                videoPlayerContainerElement.innerHTML = `<p class="text-center text-gray-400 flex items-center justify-center h-full">Vídeo indisponível.</p>`;
            }
            
            document.getElementById('exerciseReps').textContent = exercisePerf.repsTargetString; 
            
            document.getElementById('repsInput').value = ''; 
            document.getElementById('repsInput').focus();

            if (currentExerciseIndex === performanceData.length - 1 && currentSeriesNumber > exercisePerf.seriesTargetCount) {
                document.getElementById('finishWorkoutBtn').classList.remove('hidden');
                document.getElementById('completeSeriesBtn').classList.add('hidden');
                document.getElementById('skipExerciseBtn').classList.add('hidden'); 
            } else {
                document.getElementById('finishWorkoutBtn').classList.add('hidden');
                document.getElementById('completeSeriesBtn').classList.remove('hidden');
                document.getElementById('skipExerciseBtn').classList.remove('hidden');
            }

            document.getElementById('completeSeriesBtn').disabled = false;
            document.getElementById('skipExerciseBtn').disabled = false; 
            document.getElementById('seriesInputArea').classList.remove('hidden');
            clearRestTimer(); 
        }

        function completeSeries() {
            let repsValue = document.getElementById('repsInput').value.trim();
            if (repsValue === "") {
                repsValue = "N/A"; 
            }

            const currentExercisePerformance = performanceData[currentExerciseIndex];
            currentExercisePerformance.seriesDone.push({ reps: repsValue });

            document.getElementById('completeSeriesBtn').disabled = true; 
            document.getElementById('skipExerciseBtn').disabled = true; 
            document.getElementById('seriesInputArea').classList.add('hidden'); 

            // Usa o tempo de descanso armazenado em performanceData
            const restTimeString = currentExercisePerformance.restTimeString; 
            totalRestDuration = parseInt(restTimeString) || 60; // Pega o número de segundos
            
            startRestTimer(totalRestDuration); 
        }
        
        function handleRestFinished() {
            currentSeriesNumber++;
            const currentExercisePerformance = performanceData[currentExerciseIndex];
            
            mediaDisplayAreaElement.classList.remove('hidden');
            videoPlayerContainerElement.classList.remove('force-hidden'); 
            circularTimerWrapperElement.classList.add('force-hidden');  
            document.getElementById('skipExerciseBtn').disabled = false; 


            if (currentSeriesNumber <= currentExercisePerformance.seriesTargetCount) {
                displayCurrentExerciseAndSeries();
            } else {
                skipExercise(false); 
            }
        }

        function confirmSkipExercise() {
            if (confirm("Tem certeza que deseja pular todas as séries restantes deste exercício?")) {
                skipExercise(true); 
            }
        }

        function skipExercise(manualSkip) {
            clearRestTimer(); 

            if (manualSkip) {
                const currentExPerf = performanceData[currentExerciseIndex];
                const seriesTarget = currentExPerf.seriesTargetCount;
                while (currentExPerf.seriesDone.length < seriesTarget) {
                    currentExPerf.seriesDone.push({ reps: "Pulado" });
                }
                showToast(`${currentExPerf.exerciseName} pulado.`);
            }
            
            currentExerciseIndex++; 
            currentSeriesNumber = 1; 

            if (currentExerciseIndex < performanceData.length) {
                displayCurrentExerciseAndSeries(); 
            } else {
                document.getElementById('finishWorkoutBtn').classList.remove('hidden');
                document.getElementById('completeSeriesBtn').classList.add('hidden'); 
                document.getElementById('skipExerciseBtn').classList.add('hidden');
                document.getElementById('seriesInputArea').classList.add('hidden');
                circularTimerWrapperElement.classList.add('force-hidden'); 
                videoPlayerContainerElement.classList.remove('force-hidden'); 
                mediaDisplayAreaElement.classList.remove('hidden');
                showToast("Treino Concluído! Clique em Finalizar para ver o resumo.");
            }
        }

        // --- LÓGICA DE PONTUAÇÃO DE ESTRELAS ---
        function parseRepsTarget(repsString) {
            if (!repsString || typeof repsString !== 'string') return { type: 'invalid' };

            repsString = repsString.toLowerCase().trim();
             const rangeMatch = repsString.match(/^(\d+)\s*-\s*(\d+)/);
             if (rangeMatch) {
                 return { type: 'range', min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
             }
             const fixedMatch = repsString.match(/^(\d+)/);
             if (fixedMatch) {
                 if (!repsString.includes('-') && !repsString.includes('seg') && !repsString.includes('s') && !repsString.includes('"')) { 
                     return { type: 'fixed', value: parseInt(fixedMatch[1]) };
                 }
             }
            if (repsString.includes('hold') || repsString.includes('seg') || repsString.includes('s') || repsString.includes('"')) {
                const match = repsString.match(/(\d+)/);
                return match ? { type: 'hold', duration: parseInt(match[1]) } : { type: 'text' };
            }
            if (repsString === 'amrap' || repsString.includes('max')) {
                return { type: 'amrap' };
            }
            return { type: 'text' }; 
        }

        function calculateExerciseStars(exercisePerfEntry) {
            const targetStr = exercisePerfEntry.repsTargetString;
            const parsedTarget = parseRepsTarget(targetStr);

            if (parsedTarget.type !== 'range' && parsedTarget.type !== 'fixed') {
                return 0; 
            }

            let totalRepsDoneNum = 0;
            let numericSeriesCount = 0;
            exercisePerfEntry.seriesDone.forEach(serie => {
                if (serie.reps !== "Pulado" && serie.reps !== "N/A") {
                    const repsNum = parseInt(serie.reps);
                    if (!isNaN(repsNum)) {
                        totalRepsDoneNum += repsNum;
                        numericSeriesCount++;
                    }
                }
            });

            if (numericSeriesCount === 0) return 0; 

            const avgRepsDonePerSeries = totalRepsDoneNum / numericSeriesCount;

            if (parsedTarget.type === 'range') {
                const { min, max } = parsedTarget;
                const avgTarget = (min + max) / 2;
                if (avgRepsDonePerSeries > max) return 4; 
                if (avgRepsDonePerSeries >= avgTarget) return 3; 
                if (avgRepsDonePerSeries >= min) return 2;
                if (avgRepsDonePerSeries > 0 && avgRepsDonePerSeries < min) return 1;
                return 0;
            } else if (parsedTarget.type === 'fixed') {
                const targetVal = parsedTarget.value;
                if (avgRepsDonePerSeries > targetVal) return 4; 
                if (avgRepsDonePerSeries === targetVal) return 3;
                if (avgRepsDonePerSeries >= targetVal * 0.75) return 2; 
                if (avgRepsDonePerSeries > 0 && avgRepsDonePerSeries < targetVal * 0.75) return 1;
                return 0;
            }
            return 0;
        }

        function getStarString(starCount) {
            let starsHtml = '';
            const totalDisplayStars = 3; 
            for (let i = 1; i <= totalDisplayStars; i++) {
                starsHtml += `<span class="${i <= starCount ? '' : 'empty-star'}">★</span>`;
            }
            if (starCount === 4) { 
                starsHtml += `<span class="bonus-star">⭐</span>`;
            }
            return `<div class="star-rating inline-block">${starsHtml}</div>`;
        }


        function finishWorkout() {
            userProgressData = []; 
            const studentName = "Aluno Calistenia PRO"; 
            const date = new Date().toLocaleDateString('pt-BR');

            performanceData.forEach(exercisePerf => {
                exercisePerf.stars = calculateExerciseStars(exercisePerf);

                exercisePerf.seriesDone.forEach((seriesData, index) => {
                    userProgressData.push({
                        date: date,
                        studentName: studentName,
                        level: selectedLevel,
                        workoutName: selectedWorkoutName,
                        exerciseName: exercisePerf.exerciseName,
                        exerciseId: exercisePerf.exerciseId, // Inclui o ID do exercício
                        seriesNumber: index + 1, 
                        repsDone: seriesData.reps,
                    });
                });
            });
            
            console.log("Simulando envio para Google Sheets:", userProgressData);
            console.log("Performance Data com Estrelas:", performanceData); 
            showToast(`Resumo do ${selectedWorkoutName} gerado! (Dados "enviados")`);
            
            // Aqui seria o local para chamar a função que envia os dados para a API (doPost)
            // Ex: saveProgressToSheet(userProgressData); 
            
            displaySummary();
            showScreen('summaryScreen');
        }

        function displaySummary() {
            const summaryContent = document.getElementById('workoutSummaryContent');
            const studentInfo = userProgressData.length > 0 ? userProgressData[0] : { studentName: 'N/A', date: 'N/A' };

            summaryContent.innerHTML = `
                <p><strong>Aluno:</strong> ${studentInfo.studentName}</p>
                <p><strong>Data:</strong> ${studentInfo.date}</p>
                <p><strong>Nível:</strong> ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
                <p><strong>Treino:</strong> ${selectedWorkoutName}</p>
                <hr class="my-3 border-gray-600"> <h4 class="font-semibold mb-2 text-xl text-gray-200" style="font-family: 'Inter', sans-serif;">Desempenho Detalhado:</h4>
            `;
            
            performanceData.forEach(exPerf => {
                const exerciseDiv = document.createElement('div');
                exerciseDiv.className = 'mb-3 p-3 bg-gray-800 rounded-md shadow-sm'; 
                
                const repsTargetDisplay = `(Alvo: ${exPerf.repsTargetString})`;
                const starRatingHtml = getStarString(exPerf.stars);

                exerciseDiv.innerHTML = `
                    <div class="flex justify-between items-center">
                        <p class="font-medium text-gray-100">${exPerf.exerciseName} <span class="text-sm text-gray-400">${repsTargetDisplay}</span></p>
                        ${starRatingHtml}
                    </div>`;
                
                if (exPerf.seriesDone.length > 0) {
                    const seriesList = document.createElement('ul');
                    seriesList.className = 'list-disc list-inside ml-4 text-sm text-gray-300 mt-1';
                    exPerf.seriesDone.forEach((serie, index) => {
                        seriesList.innerHTML += `<li>Série ${index + 1}: ${serie.reps}</li>`;
                    });
                    exerciseDiv.appendChild(seriesList);
                } else {
                     exerciseDiv.innerHTML += `<p class="text-sm text-gray-400 mt-1">Nenhuma série registrada.</p>`;
                }
                summaryContent.appendChild(exerciseDiv);
            });
            
            const statsDiv = document.getElementById('workoutStats');
            let totalRepsOverall = 0;
            userProgressData.forEach(entry => {
                const repsNumeric = parseInt(entry.repsDone);
                if (!isNaN(repsNumeric)) {
                    totalRepsOverall += repsNumeric;
                }
            });

            statsDiv.innerHTML = `
                <h3 class="text-xl font-semibold mb-2 text-blue-400" style="font-family: 'Inter', sans-serif;">Estatísticas Gerais</h3>
                <p><strong>Total de Repetições (numéricas):</strong> ${totalRepsOverall > 0 ? totalRepsOverall : (userProgressData.some(e => !isNaN(parseInt(e.repsDone))) ? totalRepsOverall : "N/A")}</p>
                <p><strong>Exercícios Registrados:</strong> ${performanceData.filter(ex => ex.seriesDone.length > 0).length}</p>
                <p><strong>Progresso (vs último):</strong> <span class="text-gray-500">Comparação não implementada.</span></p>
            `;
            
            document.getElementById('motivationalMessage').textContent = `Parabéns, ${studentInfo.studentName}! Você mandou bem no ${selectedWorkoutName}! Continue focado(a)!`;
        }

        // --- TIMERS ---
        function formatTime(totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        
        function setProgress(percent) { 
             if (circumference) { 
                const offset = circumference - (percent / 100) * circumference;
                progressRingElement.style.strokeDashoffset = offset;
             }
        }

        function startRestTimer(durationInSeconds) {
            clearRestTimer(); 
            restTimerSeconds = durationInSeconds;
            totalRestDuration = durationInSeconds; 
            restTimerRunning = true;

            mediaDisplayAreaElement.classList.remove('hidden'); 
            videoPlayerContainerElement.classList.add('force-hidden'); 
            circularTimerWrapperElement.classList.remove('force-hidden'); 
            
            document.getElementById('pauseRestTimerBtn').textContent = 'Pausar'; 
            document.getElementById('pauseRestTimerBtn').disabled = false;
            document.getElementById('skipRestTimerBtn').disabled = false;

            circularTimerTextElement.textContent = formatTime(restTimerSeconds);
            setProgress(0); 

            restTimerInterval = setInterval(() => {
                restTimerSeconds--;
                circularTimerTextElement.textContent = formatTime(restTimerSeconds);
                
                const percentCompleted = ((totalRestDuration - restTimerSeconds) / totalRestDuration) * 100;
                setProgress(percentCompleted);

                if (restTimerSeconds < 0) { 
                    clearRestTimer();
                    showToast("Descanso finalizado!");
                    handleRestFinished();
                }
            }, 1000);
        }

        function pauseRestTimer() {
            if (restTimerRunning) {
                restTimerRunning = false;
                clearInterval(restTimerInterval);
                document.getElementById('pauseRestTimerBtn').textContent = 'Retomar';
            } else {
                if (restTimerSeconds >= 0) { 
                    restTimerRunning = true;
                    document.getElementById('pauseRestTimerBtn').textContent = 'Pausar';
                     restTimerInterval = setInterval(() => {
                        restTimerSeconds--;
                        circularTimerTextElement.textContent = formatTime(restTimerSeconds);
                        const percentCompleted = ((totalRestDuration - restTimerSeconds) / totalRestDuration) * 100;
                        setProgress(percentCompleted);
                        if (restTimerSeconds < 0) {
                            clearRestTimer();
                            showToast("Descanso finalizado!");
                            handleRestFinished();
                        }
                    }, 1000);
                }
            }
        }
        
        function skipRest() {
            clearRestTimer();
            showToast("Descanso pulado.");
            handleRestFinished(); 
        }

        function clearRestTimer() {
            clearInterval(restTimerInterval);
            restTimerRunning = false;
            setProgress(0); 
        }

        // --- UTILITÁRIOS ---
        function showToast(message, duration = 3000) {
            const toast = document.getElementById('toastNotification');
            toast.textContent = message;
            toast.classList.remove('hide');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                toast.classList.add('hide');
            }, duration);
        }

        // --- INICIALIZAÇÃO ---
        // Não precisa mais preencher mockSheetData aqui

        showScreen('homeScreen');
        console.warn("IMPORTANTE: A integração com Google Sheets agora está ativa (se a URL do script foi inserida). A função de salvar progresso (doPost) ainda precisa ser implementada no script e no app.");
        showToast("App Iniciado.", 4000);

    </script>
</body>
</html>
