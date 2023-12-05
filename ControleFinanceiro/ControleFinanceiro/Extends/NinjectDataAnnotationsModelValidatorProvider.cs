using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
namespace Certificare.Extends
{
    public class NinjectDataAnnotationsModelValidatorProvider : DataAnnotationsModelValidatorProvider
    {
        private readonly IKernel kernel;
        private readonly MethodInfo getAttributeMethodInfo;

        public NinjectDataAnnotationsModelValidatorProvider(IKernel kernel)
        {
            this.kernel = kernel;
            this.getAttributeMethodInfo = typeof(DataAnnotationsModelValidator).GetMethod("get_Attribute", BindingFlags.NonPublic | BindingFlags.DeclaredOnly | BindingFlags.Instance);
        }

        protected override IEnumerable<ModelValidator> GetValidators(ModelMetadata metadata, ControllerContext context, IEnumerable<Attribute> attributes)
        {
            var validators = base.GetValidators(metadata, context, attributes);
            foreach (var modelValidator in validators.OfType<DataAnnotationsModelValidator>())
            {
                var attribute = this.getAttributeMethodInfo.Invoke(modelValidator, new object[0]);
                this.kernel.Inject(attribute);
            }
            return validators;
        }
    }
}