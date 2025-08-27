"use client"
import Image from "next/image"

export default function ProductFeatures() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ И ТЕХНОЛОГИИ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image cards */}
        <div className="bg-[#111] rounded-2xl overflow-hidden">
          <Image
            src="/images/feature-legs.png" // 👉 replace with your image
            alt="Выдвижные ножки"
            width={500}
            height={300}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="bg-[#111] rounded-2xl overflow-hidden">
          <Image
            src="/images/feature-keys.png"
            alt="Регистрация нажатий"
            width={500}
            height={300}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="bg-[#111] rounded-2xl overflow-hidden">
          <Image
            src="/images/feature-fn.png"
            alt="Быстрый доступ"
            width={500}
            height={300}
            className="object-cover w-full h-48"
          />
        </div>
      </div>

      {/* Text blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-[#111] rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white mb-2">
            ВЫДВИЖНЫЕ НОЖКИ
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            В конструкции предусмотрены две выдвижные ножки, с помощью которых
            можно расположить клавиатуру под разными углами. Так вы сможете
            подобрать для себя идеальное положение устройства для максимальной
            результативности в играх.
          </p>
        </div>
        <div className="bg-[#111] rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white mb-2">
            РЕГИСТРАЦИЯ КАЖДОГО НАЖАТИЯ
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            Каждое нажатие регистрируется отдельно. Это позволяет избежать
            залипания клавиш в играх.
          </p>
        </div>
        <div className="bg-[#111] rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white mb-2">
            БЫСТРЫЙ ДОСТУП
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            Управляйте компьютером с помощью клавиши «Fn». Она активирует
            дополнительные команды в Windows, такие как включение беззвучного
            режима, остановка плеера, повышение уровня громкости и так далее.
          </p>
        </div>
      </div>
    </section>
  )
}
