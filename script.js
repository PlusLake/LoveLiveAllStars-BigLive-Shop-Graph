(() => {
    const dataLink = "https://gist.githubusercontent.com/PlusLibrary/5a3da3bb6d11433bb1db740d1511645e/raw/9d26353f5b1d334467a39d8ba0b9a1aaca8b241d/llas_biglive_shop.json";

    (() => {
        fetch(dataLink)
            .then(response => response.json())
            .then(data => main(data));
    })();

    const $ = query => document.querySelector(query);
    const main = raw => {
        const data = Object.values(raw.reduce((previous, current) => {
            previous[current.name] ??= { "name": current.name, "UR": 0, "SR": 0 };
            previous[current.name][current.rarity]++;
            return previous;
        }, [])).sort((a, b) => b.UR + b.SR - a.UR - a.SR);
        const chart = {
            labels: data.map(value => value.name),
            datasets: [{
                label: "UR",
                data: data.map(value => value.UR),
                backgroundColor: ["#ECE"]
            }, {
                label: "SR",
                data: data.map(value => value.SR),
                backgroundColor: ["#CEE"]
            }]
        };
        new Chart($("#chart"), {
            type: "bar",
            data: chart,
            options: {
                indexAxis: "y",
                scales: {
                    y: { stacked: true },
                    x: {
                        stacked: true,
                        ticks: { stepSize: 1 }
                    },
                },
                maintainAspectRatio: false,
            },
        });
    };
})();
