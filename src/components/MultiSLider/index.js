import { useState } from "react";

function MultiSlider() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      value: 10,
    },
  ]);

  const totalSlideValue = slides.reduce(function (acc, cur) {
    return parseInt(acc) + parseInt(cur.value);
  }, 0);

  const addNewSlider = () => {
    if (totalSlideValue >= 100) return;
    setSlides((prevSliders) => [
      ...prevSliders,
      { id: prevSliders.length + 1, value: 0 },
    ]);
  };

  const onChange = (i) => (e) => {
    const currentSlides = [...slides];
    const currentSlider = currentSlides[i];
    const totalValue = slides.reduce(function (acc, cur) {
      return parseInt(acc) + parseInt(cur.value);
    }, 0);
    if (totalValue < 100) {
      currentSlider.value = parseInt(e.target.value);
      setSlides(currentSlides);
    }

    if (totalValue >= 100) {
      if (parseInt(e.target.value) > currentSlider.value) {
        return;
      }
      currentSlider.value = parseInt(e.target.value);
      setSlides(currentSlides);
    }
  };

  const onRemove = (id) => (e) => {
    const currentSlides = [...slides].filter((slide) => id !== slide.id);
    setSlides(currentSlides.map((slide, i) => ({ ...slide, id: i + 1 })));
  };

  return (
    <div>
      <div className="mb-4">
        <button type="button" onClick={addNewSlider}>
          Add new slide
        </button>
      </div>
      <div className="mb-4">Total: {parseInt(totalSlideValue)}</div>
      {slides.map((slide, i) => (
        <div key={i} className="mb-4">
          <input type="range" value={slide.value} onChange={onChange(i)} />
          <div className="mb-2">
            {slide.value} - {slide.id}
          </div>
          <button type="button" onClick={onRemove(i)}>
            remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default MultiSlider;
